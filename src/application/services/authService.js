module.exports = class AuthService {

    constructor (authProvider) {
        this.authProvider = authProvider;
    }

    async signUp(email, password) {

        return this.authProvider.signUp(email, password);
    }

    async signIn(email, password) {

        return this.authProvider.signIn(email, password);
    }

}