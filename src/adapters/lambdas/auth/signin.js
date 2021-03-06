'use strict';

const AWS = require('aws-sdk')
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()

module.exports.handler = async event => {
  const body = JSON.parse(event.body);
  const { username, password } = body;
  if (!username || !password) {
    return response(400, 'You must specify the username and password');
  }
  
  return cognitoIdentityServiceProvider.initiateAuth({
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password
    },
    ClientId: process.env.COGNITO_CLIENT_ID
  }).promise().then((result) => {
    return response(200, result.AuthenticationResult);
  }).catch((error) => {
    return response(error.statusCode, error.message);
  });
};

const response = (responseCode, message) => {
  return {
    statusCode: responseCode,
    body: JSON.stringify(responseCode === 200 ? 
      {
        ...message,
      } :
      {
        message
      },
      null,
      2
    ),
  };
}
