import { NextFunction, Request, Response,RequestHandler } from "express"

// Request Handler is a function having args req,res,next
export const catchAsyncError =<T extends RequestHandler>(fn:T):RequestHandler => {
    return async (req:Request, res:Response, next:NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }

}
