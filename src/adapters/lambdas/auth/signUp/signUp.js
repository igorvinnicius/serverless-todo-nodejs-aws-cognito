'use strict';

const SignUpInput = require ('../../../../application/use_cases/auth/signUp/signUpInput');
const inputSchema = require('./inputSchema');
const container = require('./container');

console.log(container);

const signUpUseCase = container.get('signUpUseCase');
const requestsService = container.get('requestService');
const middyHandler = container.get('middyHandler');

const baseHandler = async (event) => {
  
  const { name, email, password } = event.body;   

  const signUpInput = new SignUpInput(name, email, password);  

  return await requestsService.handle(async () => {
      
      return await signUpUseCase.execute(signUpInput);
      
  });

};

const handler = middyHandler(baseHandler, inputSchema);   
module.exports = { handler }
