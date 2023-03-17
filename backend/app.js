const express=require('express');
const app = express();

app.use(express.json())
const productRouter = require("./routes/productRoutes.js");

app.use("/api/prod",productRouter);






module.exports = app