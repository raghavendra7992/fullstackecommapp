const express=require('express');
const app = express();
const ErrorHandler = require('./middleware/error.js')
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({useTempFiles: true}));

// config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({
        path:"backend/config/.env"
    })}

const productRouter = require("./routes/productRoutes.js");
const userRouter = require("./routes/userRoutes.js");

app.use("/api/prod",productRouter);
app.use("/api/prod",userRouter)
app.use(ErrorHandler);



module.exports = app