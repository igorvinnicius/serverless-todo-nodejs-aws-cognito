'use strict';

const AWS = require('aws-sdk')
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()

module.exports.handler = async event => {
  
  console.log(event.body);
  console.log(process.env);

  const body = JSON.parse(event.body);  
  const { username, password } = body;
  
  if (!username || !password) {
    return response(400, 'You must specify the username and password');
  }
  
  return cognitoIdentityServiceProvider.signUp({
    Username: username,
    Password: password,
    ClientId: process.env.COGNITO_CLIENT_ID
  }).promise()
  .then((result) => {
    return response(200, 'Signed up successfully, please check your email');
  })
  .catch((error) => {
    return response(error.statusCode, error.message);
  });

};

const response = (responseCode, message) => {
  return {
    statusCode: responseCode,
    body: JSON.stringify(
      {
        message,
      },
      null,
      2
    ),
  };

}