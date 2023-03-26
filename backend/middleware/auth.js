const ErrorHandler=require("../uitils/Errorhandler.js");
const catchAsyncErrors=require("./catchAsyncError.js");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel.js");
const isAuthenticatedUser=catchAsyncErrors(async (req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login for access resources ",401));

    }
    const decodeData=jwt.verify(token,process.env.SECRET_KEY);
    req.User=await User.findById(decodeData.id)
})
module.exports={
    isAuthenticatedUser
}