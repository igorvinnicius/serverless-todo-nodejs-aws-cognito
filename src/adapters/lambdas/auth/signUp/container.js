const awilix = require('awilix');
const BaseContainer = require('../../../../frameworks/dependency_injection/baseContainer');
const UsersRepository = require('../../../../frameworks/persistence/dynamoDB/usersRepository');
const CognitoProvider = require('../../../../frameworks/auth/cognitoProvider');
const AuthService = require('../../../../application/services/authService');
const SignUpUseCase = require('../../../../application/use_cases/auth/signUp/signUpUseCase');

class Container extends BaseContainer {

    constructor() {
        
        super();

        console.log('Cognito ID');
        console.log(process.env.COGNITO_CLIENT_ID);

        this.container.register({
            cognitoClientId: awilix.asValue(process.env.COGNITO_CLIENT_ID),
            usersRepository: awilix.asClass(UsersRepository),
            authProvider: awilix.asClass(CognitoProvider),
            authService: awilix.asClass(AuthService),            
            signUpUseCase: awilix.asClass(SignUpUseCase)
        });
    }
}

module.exports = new Container();