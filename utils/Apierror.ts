import {Request,Response,NextFunction} from 'express'

class ApiError extends Error {
    statusCode:number
    code?:string
    keyValue?:Record<string,any>
    constructor(statusCode:number, message:string) {
        super(message);
        this.message = message;
        this.statusCode = statusCode
    }
}

const errorMiddleWare = (error:ApiError, req:Request, res:Response, next:NextFunction) => {

    error.statusCode = error.statusCode || 500
    error.message = error.message || "internal server error"

    if (error.code === '11000'&&error.keyValue) {
        error.message = `Duplicate Key Found ${Object.keys(error.keyValue)[0]}`
    }
    res.status(error.statusCode).json({
        success: false,
        message: error.message
    })
}

export { ApiError, errorMiddleWare }
