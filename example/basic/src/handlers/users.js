// users.js

module.exports.hello = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello world!' })
  });
};
