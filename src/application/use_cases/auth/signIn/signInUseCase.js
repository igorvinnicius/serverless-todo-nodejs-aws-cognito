const SignInOutput = require('./signInOutput');
const SignInError = require('../../../errors/signInError');

module.exports = class SignInUseCase {

    constructor(authService, usersRepository) {
        this.authService = authService;
        //this.usersRepository = usersRepository;
    }

    async execute(signInInput) {

        // const user = await this.usersRepository.getByEmail(signUpInput.email);        

        // if (user) {
        //     throw new DuplicateError('User already exists.');
        // }        

        const signInResponse = await this.authService.signIn(signInInput.email, signInInput.password);        

        if(!signInResponse.success) {
            throw new SignInError('Sign in has been failed.');
        }
        
        return new SignInOutput(signInResponse.data);
    }
}