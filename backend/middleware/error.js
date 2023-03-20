const ErrorHandler=require("../uitils/Errorhandler.js");
module.exports=(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    if (process.env.NODE_ENV === "development") {
      err.stack = err.stack || "";
      res.status(err.statusCode).json({
        success: false,
        error: err.message,
        stack: err.stack.split("\n"),
      });
    } else {
      res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    }
}