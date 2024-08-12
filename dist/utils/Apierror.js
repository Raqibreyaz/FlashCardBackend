"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleWare = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
const errorMiddleWare = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "internal server error";
    if (error.code === '11000' && error.keyValue) {
        error.message = `Duplicate Key Found ${Object.keys(error.keyValue)[0]}`;
    }
    res.status(error.statusCode).json({
        success: false,
        message: error.message
    });
};
exports.errorMiddleWare = errorMiddleWare;
