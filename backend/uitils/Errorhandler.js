class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  
    logError() {
      console.error(`[${new Date().toISOString()}] ${this.statusCode}: ${this.message}`);
    }
  
    toJSON() {
      return {
        success: false,
        error: this.message,
        statusCode: this.statusCode,
        stack: this.stack,
      };
    }
  }
  

module.exports = ErrorHandler;