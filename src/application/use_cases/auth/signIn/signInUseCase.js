const SignInOutput = require('./signInOutput');
const SignInError = require('../../../errors/signInError');

module.exports = class SignInUseCase {

    constructor(authService) {
        this.authService = authService;        
    }

    async execute(signInInput) {        

        const signInResponse = await this.authService.signIn(signInInput.email, signInInput.password);        

        if(!signInResponse.success) {
            throw new SignInError('Sign in has been failed.');
        }
        
        return new SignInOutput(signInResponse.data);
    }
}