const app=require("./app");
const dotenv=require("dotenv");
const connectionDatabase=require("./config/Database.js");


process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`not working due to this handling`)
})
//config
dotenv.config({
    path:"backend/config/.env"
})
connectionDatabase()

// create server
const server=app.listen(process.env.PORT,()=>{
    console.log(`success ${process.env.PORT}`)
})

process.on("unhandledRejection",(err)=>{
    console.log(`Srver crashed due to ${err.message}`);
    console.log(`Srver crashed`)

    server.close(()=>{
        process.exit(1)
    })
})