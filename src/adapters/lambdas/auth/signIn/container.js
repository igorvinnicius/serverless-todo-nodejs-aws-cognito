const awilix = require('awilix');
const BaseContainer = require('../../../../frameworks/dependency_injection/baseContainer');
const CognitoProvider = require('../../../../frameworks/auth/cognitoProvider');
const AuthService = require('../../../../application/services/authService');
const SignInUseCase = require('../../../../application/use_cases/auth/signIn/signInUseCase');

class Container extends BaseContainer {

    constructor() {
        
        super();       

        this.container.register({
            cognitoClientId: awilix.asValue(process.env.COGNITO_CLIENT_ID),            
            authProvider: awilix.asClass(CognitoProvider),
            authService: awilix.asClass(AuthService),            
            signInUseCase: awilix.asClass(SignInUseCase)
        });
    }
}

module.exports = new Container();