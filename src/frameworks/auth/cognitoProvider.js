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
}