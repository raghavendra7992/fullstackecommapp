const ErrorHandler=require("../uitils/Errorhandler.js");
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode
       err.message=err.message||"Internal Server Error"
    res.status(err.statusCode).json({
        success:false,
        error:err.message;
    })
}