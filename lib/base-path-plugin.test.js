const { join } = require('path');
const { expect } = require('chai');

const BasePathPlugin = require('./base-path-plugin');

/**
 * Simple object copy to avoid reference copy.
 *
 * Note: only properties with primivate value will be copied,
 * properties with function assigned won't be copied.
 *
 * @param {Object} obj Object
 * @returns {Object} Copied Object
 */
function copyObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Validate that the handler path rewriting match by comparing
 * the previous state of a set of functions and a new one.
 *
 * @param {string} basePath Bash path
 * @param {Object} previousFunctions Functions
 * @param {Object} currentFunctions Functions
 * @returns {void}
 */
function validatePath(basePath, prevFunctions, currFunctions) {
  Object.keys(prevFunctions).forEach(functionName => {
    const expectedPath = join(basePath, prevFunctions[functionName].handler);
    const newPath = currFunctions[functionName].handler;

    expect(expectedPath).to.be.equal(newPath);
  });
}

describe('BasePathPlugin', () => {
  beforeEach(() => {
    this.serverlessMock = {
      providers: {},
      service: {
        service: 'serverless-demo-functions-base-path',
        serviceObject: { name: 'serverless-demo-functions-base-path' },
        provider: {
          stage: 'dev',
          region: 'eu-west-1',
          variableSyntax: '',
          name: 'aws',
          runtime: 'nodejs6.10',
          memorySize: 128,
          timemout: 10,
          versionFunctions: true
        },
        custom: { functionsBasePath: 'src/handlers' },
        plugins: ['serverless-functions-base-path'],
        functions: {
          hello: {
            handler: 'users.hello',
            events: [{ http: { path: 'hello', method: 'get' } }],
            name: 'serverless-demo-functions-base-path-dev-hello'
          },
          bye: {
            handler: 'users.bye',
            events: [{ http: { path: 'bye', method: 'get' } }],
            name: 'serverless-demo-functions-base-path-dev-bye'
          }
        },
        resources: undefined,
        package: {}
      }
    };

    this.optionsMock = {};
  });

  it('should not rewrite the functions handler path if "basePath" is not specified', () => {
    this.serverlessMock.service.custom.functionsBasePath = null;

    const Plugin = new BasePathPlugin(this.serverlessMock, this.optionsMock);
    const previousFunctions = copyObj(Plugin.serverless.service.functions);

    Plugin.rewriteHandlersPath();

    const currentFunctions = copyObj(Plugin.serverless.service.functions);

    validatePath(Plugin.basePath, previousFunctions, currentFunctions);
  });

  it('should not rewrite the functions handler path if "basePath" is something else than a string', () => {
    this.serverlessMock.service.custom.functionsBasePath = { prop: 'val' };

    const Plugin = new BasePathPlugin(this.serverlessMock, this.optionsMock);
    const previousFunctions = copyObj(Plugin.serverless.service.functions);

    Plugin.rewriteHandlersPath();

    const currentFunctions = copyObj(Plugin.serverless.service.functions);

    validatePath(Plugin.basePath, previousFunctions, currentFunctions);
  });

  it('should rewrite the functions handler path if a "basePath" variable is passed', () => {
    const Plugin = new BasePathPlugin(this.serverlessMock, this.optionsMock);
    const previousFunctions = copyObj(Plugin.serverless.service.functions);

    Plugin.rewriteHandlersPath();

    const currentFunctions = copyObj(Plugin.serverless.service.functions);

    validatePath(Plugin.basePath, previousFunctions, currentFunctions);
  });

  it('should throw an error if handler path is not specified', () => {
    this.serverlessMock.service.functions.bye.handler = null;

    const Plugin = new BasePathPlugin(this.serverlessMock, this.optionsMock);
    const testFunc = () => {
      Plugin.rewriteHandlersPath();
    };

    expect(testFunc).to.throw(
      Error,
      /handler path is not defined for function/
    );
  });

  it('should throw an error if handler path is something else than a string', () => {
    this.serverlessMock.service.functions.bye.handler = { props: 'val' };

    const Plugin = new BasePathPlugin(this.serverlessMock, this.optionsMock);
    const testFunc = () => {
      Plugin.rewriteHandlersPath();
    };

    expect(testFunc).to.throw(
      Error,
      /handler path must be a string for function/
    );
  });
});
