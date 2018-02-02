// users.js

module.exports.hello = (event, context, callback) => {
  callback(
    null,
    JSON.stringify({
      statusCode: 200,
      body: { message: 'Hello world!' }
    })
  );
};
