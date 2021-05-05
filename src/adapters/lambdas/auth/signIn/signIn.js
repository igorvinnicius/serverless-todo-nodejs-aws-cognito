'use strict';

const SignInInput = require ('../../../../application/use_cases/auth/signIn/signInInput');
const inputSchema = require('./inputSchema');
const container = require('./container');

console.log(container);

const signUpUseCase = container.get('signInUseCase');
const requestsService = container.get('requestService');
const middyHandler = container.get('middyHandler');

const baseHandler = async (event) => {
  
  const { email, password } = event.body;   

  const signInInput = new SignInInput(email, password);  

  return await requestsService.handle(async () => {
      
      return await signUpUseCase.execute(signInInput);
      
  });

};

const handler = middyHandler(baseHandler, inputSchema);   
module.exports = { handler }