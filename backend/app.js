const express=require('express');
const app = express();
const ErrorHandler = require('./middleware/error.js')
const cookieParser = require('cookie-parser');
app.use(express.json())
app.use(cookieParser())
const productRouter = require("./routes/productRoutes.js");
const userRouter = require("./routes/userRoutes.js");

app.use("/api/prod",productRouter);
app.use("/api/prod",userRouter)
app.use(ErrorHandler);



module.exports = app