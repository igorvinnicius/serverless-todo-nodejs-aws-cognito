module.exports = class SignUpError extends Error {
    constructor(args){
        super(args);        
        this.name = "SignUpError"
        this.message = args
        this.statusCode = 400
    }
}