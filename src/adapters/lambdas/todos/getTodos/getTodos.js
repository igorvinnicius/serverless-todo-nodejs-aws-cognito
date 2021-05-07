'use strict';

const container = require('./container');

const getTodosUseCase = container.get('getTodosUseCase');
const requestsService = container.get('requestService');
const middyHandler = container.get('middyHandler');

const baseHandler = async (event) => {

    const userData = event.requestContext.authorizer.claims;

    return await requestsService.handle(async () => {
        
        return await getTodosUseCase.execute(userData.sub);
        
    });
};

const handler = middyHandler(baseHandler);   
module.exports = { handler }