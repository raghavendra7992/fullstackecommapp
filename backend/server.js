const app=require("./app");
const dotenv=require("dotenv");
const connectionDatabase=require("./config/Database.js");
const cloudinary = require("cloudinary");

process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`not working due to this handling`)
})
//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({
        path:"backend/config/.env"
    })}
connectionDatabase()
// cloudinary database
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})



// create server
const server=app.listen(process.env.PORT,()=>{
    console.log(`success ${process.env.PORT}`)
})

process.on("unhandledRejection",(err)=>{
    console.log(`Server crashed due to this :- ${err.message}`);
    console.log(`Server crashed`)

    server.close(()=>{
        process.exit(1)
    })
})