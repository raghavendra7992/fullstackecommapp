const ErrorHandler=require("../uitils/Errorhandler.js");
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode
       err.message=err.message||"Internal Server Error"||404
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}