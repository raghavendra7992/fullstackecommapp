const express=require('express');
const app = express();
const ErrorHandler = require('./middleware/error.js')
app.use(express.json())
const productRouter = require("./routes/productRoutes.js");
const userRouter = require("./routes/userRoutes.js");

app.use("/api/prod",productRouter);
app.use("/api/prod",userRouter)
app.use(ErrorHandler);






module.exports = app