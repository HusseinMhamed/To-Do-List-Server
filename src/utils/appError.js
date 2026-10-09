export class AppError extends Error {
    constructor(message, status){
        super(message);
        this.name= 'app Error'
        this.status = status;

    }
}