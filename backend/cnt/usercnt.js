const User=require("../models/userModel.js");
const ErrorHandler = require("../uitils/Errorhandler.js");
const catchAsyncError=require("../middleware/catchAsyncError.js");
const sendToken = require("../uitils/jwtToken.js");



//register user
const registerUser=catchAsyncError(async(req,res,next)=>{
    const {name,email,mobile,password}=req.body;
    const user=await User.create({
        name,
        email,
        mobile,
        password,
        avatar:{
            public_id:"https://www.google.com",
            url:"https://www.google.com"
        }
    })
    const token=user.getJwtToken();

    res.status(201).json({
        success:true,
        user,
        token
    })
});

//login user

const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please enter your email and password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Password mismatch", 401));
    }
  sendToken(user,200,res)
   
  });

//logoutuser
const logoutUser = catchAsyncError(async (req, res,next)=>{
  res.cookie("token", null,
   {    expires: new Date(Date.now()),
        httpOnly: true,
        sameSite:"none",
        secure:true  })

})

module.exports ={

    registerUser,
    loginUser,
    logoutUser
}