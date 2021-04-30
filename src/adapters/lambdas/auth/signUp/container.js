const awilix = require('awilix');
const BaseContainer = require('../../../../frameworks/dependency_injection/baseContainer');
const UsersRepository = require('../../../../frameworks/persistence/dynamoDB/usersRepository');
const SignUpUseCase = require('../../../../application/use_cases/auth/signUp/signUpUseCase');

class Container extends BaseContainer {

    constructor() {
        
        super();

        this.container.register({
            usersRepository: awilix.asClass(UsersRepository),
            signUpUseCase: awilix.asClass(SignUpUseCase)
        });
    }
}

module.exports = new Container();