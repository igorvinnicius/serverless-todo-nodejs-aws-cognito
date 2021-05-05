module.exports = class CognitoBError extends Error {
    constructor(args){
        super(args);        
        this.name = "CognitoBError"
        this.message = args.message
        this.data = args
        this.statusCode = 400
    }
}