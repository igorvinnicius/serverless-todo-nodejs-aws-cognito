module.exports = class SignInError extends Error {
    constructor(args){
        super(args);        
        this.name = "SignInError"
        this.message = args
        this.statusCode = 400
    }
}