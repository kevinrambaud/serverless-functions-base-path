# serverless-functions-base-path

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Travis](https://img.shields.io/travis/kevinrambaud/serverless-functions-base-path.svg)](https://travis-ci.org/kevinrambaud/serverless-functions-base-path)
[![Codecov](https://img.shields.io/codecov/c/github/kevinrambaud/serverless-functions-base-path.svg)](https://codecov.io/gh/kevinrambaud/serverless-functions-base-path)
[![npm](https://img.shields.io/npm/v/serverless-functions-base-path.svg)](https://www.npmjs.com/package/serverless-functions-base-path)
[![npm](https://img.shields.io/npm/dt/serverless-functions-base-path.svg)](https://www.npmjs.com/package/serverless-functions-base-path)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/kevinrambaud/serverless-functions-path/master/LICENSE) [![Greenkeeper badge](https://badges.greenkeeper.io/kevinrambaud/serverless-functions-base-path.svg)](https://greenkeeper.io/)

When a project scaffolded with Serverless framework starts to be large or so you simply want to structure in a specific way your project, your `handler` paths can be quite long to write. That's where `serverless-functions-base-path` comes in, this plugin will allow you to define a base path that indicates the location of your lambda function while keeping your `handler` paths as minimal as possible.

## Installation

Go to your project directory and install the plugin by running :

for npm users

```bash
npm i -D serverless-functions-base-path
```

for yarn users

```bash
yarn add --dev serverless-functions-base-path
```

## Usage

Let's say that our project have the following strucutre :

#### Project structure

```
my-new-serverless-project
├── src
│   └── handlers
│       └── users.js
│   └── lib
├── package.json
└── serverless.yml
```

#### Configuration

Open your `serverless.yml` configuration file and :

* add a `plugins` section
* add our fresh `serverless-functions-base-path` plugin into it
* add a `custom` section
* add a `functionsBasePath` property with your base path location

```yaml
# serverless.yml

service: hello-world-service

provider:
  name: aws
  runtime: nodejs6.10
  stage: dev
  region: eu-west-1
  memorySize: 128
  timemout: 10

custom:
  functionsBasePath: src/handlers

functions:
  hello:
    handler: users.hello
    events:
      - http:
          path: hello
          method: get

plugins:
  - serverless-functions-base-path
```

#### Invoke

Try to invoke your local function with

```bash
serverless invoke locale -f hello

# output
{
    "statusCode": 200,
    "body": "{\"message\":\"Hello world!\"}"
}
```

You can find more usage examples in the example folder.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
