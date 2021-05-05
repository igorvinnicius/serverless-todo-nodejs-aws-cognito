const CognitoError = require('./cognitoError');

module.exports = class CognitoProvider {

    constructor(AWS, cognitoClientId) {
        this.cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
        this.ClientId = cognitoClientId;
    }    

    async signUp(email, password) {

        const params = {
            Username: email,
            Password: password,
            ClientId: this.ClientId
        };

        return await this.cognitoIdentityServiceProvider.signUp(params)
        .promise()
        .then((result) => {
            console.log("SUCCESS SIGN UP!")
            console.log(result);
            return { success: true, data: result };
        })
        .catch((err) => {
            throw new CognitoError(err);
        });
    }

    async signIn(email, password) {

        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            AuthParameters: {
              USERNAME: email,
              PASSWORD: password
            },
            ClientId: this.ClientId
        };       

        return await this.cognitoIdentityServiceProvider.initiateAuth(params)
        .promise()
        .then((result) => {
            console.log("SUCCESS SIGN UP!")
            console.log(result);
            return { success: true, data: result.AuthenticationResult };
        })
        .catch((err) => {
            throw new CognitoError(err);
        });
    }
}