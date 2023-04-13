const ErrorHandler=require("../uitils/Errorhandler.js");
const catchAsyncErrors=require("./catchAsyncError.js");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel.js");
// const isAuthenticatedUser=catchAsyncErrors(async (req,res,next)=>{
//     const { token } = req.cookies;

//     if (!token) {
//       return next(new ErrorHandler("Please Login for access this resource", 401));
//     }
  
//     const decodedData = jwt.verify(token, process.env.SECRET_KEY);
  
//     req.user = await User.findById(decodedData.id);
  
//     next();
//   });
const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ErrorHandler('Please log in to access this resource', 401));
  }

  const token = authHeader.split(' ')[1];
  const decodedData = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await User.findById(decodedData.id);

  next();
});

  // Admin Roles
  
const authrizeRoles=(...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
          return next(new ErrorHandler(`${req.user.role} can not access this resources`));
        };
        next();
    }
}
module.exports={
    isAuthenticatedUser,
    authrizeRoles
}