module.exports = class CognitoProvider {

    constructor(AWS) {
        this.cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
        this.tableName = 'users';
    }    

    async sigUp(email, password) {

        const params = {
            Username: email,
            Password: password,
            ClientId: process.env.COGNITO_CLIENT_ID
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