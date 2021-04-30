const User = require('../../../../entities/user');
const DuplicateError = require('../../../errors/duplicateError');
const SignUpError = require('../../../errors/signUpError');

module.exports = class SignUpUseCase {

    constructor(authService, usersRepository) {
        this.authService = authService;
        this.usersRepository = usersRepository;
    }

    async execute(signUpInput){

        const user = await this.usersRepository.getByEmail(signUpInput.email);        

        if (user) {
            throw new DuplicateError('User already exists.');
        }

        const signUpResponse = await this.authService.signUp(signUpInput.email, signUpInput.password);

        if(!signUpResponse.success){
            throw new SignUpError('Sign up has been failed.');
        }

        const newUser = new User(signUpInput.name, signUpInput.email);
        return await this.usersRepository.add(newUser);
    }
}