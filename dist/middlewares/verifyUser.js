"use strict";
// import jwt from 'jsonwebtoken'
// // if token is valid then return the decoded token otherwise throws error
// const validateToken = (token:string) => {
//     if (!token)
//         return false
//     try {
//         let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
//         return decodedToken;
//     } catch (error) {
//         return false
//     }
// }
// const verifyUser = (req, res, next) => {
//     let user = validateToken(req.cookies.userToken)
//     if (!user)
//         return next(new ApiError(400, "user is not authenticated for this action"))
//     req.user = user;
//     return next()
// }
// const verifyAdmin = (req, res, next) => {
//     req.cookies.userToken = req.cookies.adminToken
//     verifyUser(req, res, next)
// }
// export {
//     verifyAdmin,
// }
