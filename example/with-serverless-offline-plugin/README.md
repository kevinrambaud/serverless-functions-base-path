# Example

Demo of usage of `serverless-functions-base-path` plugin.

## Installation

Clone the project

```bash
git clone https://github.com/kevinrambaud/serverless-functions-base-path.git
```

Go to the example/basic directory

```bash
cd serverless-functions-base-path/example/with-serverless-offline-plugin
```

And install dependencies

```bash
npm i
```

## Usage

You can either invoke manually the hello function by running

```bash
./node_modules/.bin/serverless offline
```

or use the `start` script by running

```bash
npm start
```

then open a new tab in your terminal and run

```bash
curl -i http://localhost:3000/hello

# output
HTTP/1.1 200 OK
Content-Type: application/json
cache-control: no-cache
content-length: 26
accept-ranges: bytes
Date: Fri, 02 Feb 2018 14:08:57 GMT
Connection: keep-alive

{"message":"Hello world!"}
```
