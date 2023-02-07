const path = require('path');

/**
 * BasePathPlugin class.
 */
class BasePathPlugin {
  /**
   * Constructor.
   *
   * @param {Object} serverless Serverless
   * @param {Object} options Options
   */
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.basePath =
      typeof this.serverless.service.custom.functionsBasePath === 'string'
        ? this.serverless.service.custom.functionsBasePath
        : '';

    this.hooks = {
      'before:run:run': this.rewriteHandlersPath.bind(this),
      'before:offline:start': this.rewriteHandlersPath.bind(this),
      'before:offline:start:init': this.rewriteHandlersPath.bind(this),
      'before:package:initialize': this.rewriteHandlersPath.bind(this),
      'before:deploy:function:packageFunction': this.rewriteHandlersPath.bind(
        this
      ),
      'before:invoke:local:invoke': this.rewriteHandlersPath.bind(this)
    };
  }

  /**
   * Rewrite handlers path of the instance's functions
   * based on the functionsBasePath custom property passed
   * through serverless config file.
   *
   * @returns {void}
   */
  rewriteHandlersPath() {
    if (this.basePath) {
      const { functions } = this.serverless.service;

      Object.keys(functions).forEach(functionName => {
        const handlerPath = functions[functionName].handler;

        if ('image' in functions[functionName]) {
          return;
        }

        if (!handlerPath) {
          throw new Error(
            `handler path is not defined for function "${functionName}"`
          );
        }

        if (typeof handlerPath !== 'string') {
          throw new Error(
            `handler path must be a string for function "${functionName}"`
          );
        }

        functions[functionName].handler = path.posix.join(
          this.basePath,
          handlerPath
        );
      });
    }
  }
}

module.exports = BasePathPlugin;
