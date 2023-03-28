const User=require("../models/userModel.js");
const ErrorHandler = require("../uitils/Errorhandler.js");
const catchAsyncError=require("../middleware/catchAsyncError.js");
const sendToken = require("../uitils/jwtToken.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;


//register user
const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, mobile, avatar } = req.body;

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  // Upload avatar to cloudinary
  let myCloud;
  try {
    myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });
  } catch (error) {
    return next(new ErrorHandler("Error uploading avatar", 500));
  }

  // Create user
  try {
    user = await User.create({
      name,
      email,
      password,
      mobile,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
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
    res.cookie("token", "", {
        expires: new Date(Date.now()),
        maxAge: 0,
        httpOnly: true,
        sameSite: 'none',
        secure: true
      });
    
      res.status(200).json({
        success: true,
        message: "Log out success",
      });
   

})



module.exports ={
    registerUser,
    loginUser,
    logoutUser
}