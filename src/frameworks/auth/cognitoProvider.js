module.exports = class CognitoProvider {

    constructor(AWS, cognitoClientId) {
        this.cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
        this.ClientId = cognitoClientId;
    }    

    async sigUp(email, password) {

        const params = {
            Username: email,
            Password: password,
            ClientId: this.cognitoClientId
        };

        return await cognitoIdentityServiceProvider.signUp(params)
        .promise()
        .then((result) => {
            console.log("SUCCESS SIGN UP!")
            return result;
        })
        .catch((err) => {
            console.log("FAILED SIGN UP!")
            console.log(err);
            return err
        });
    }

}