const User = require('../../../../entities/user');
const SignUpError = require('../../../errors/signUpError');


module.exports = class SignUpUseCase {

    constructor(authService, usersRepository) {
        this.authService = authService;
        this.usersRepository = usersRepository;
    }

    async execute(signUpInput){

        const signUpResponse = await this.authService.signUp(signUpInput.email, signUpInput.password);

        if(!signUpResponse.success){
            throw new SignUpError('Sign up has been failed.');
        }

        const user = new User(signUpInput.name, signUpInput.email);
        return await this.usersRepository.add(user);
    }
}