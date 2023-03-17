const app=require("./app");
const dotenv=require("dotenv");
const connectionDatabase=require("./config/Database.js")
//config
dotenv.config({
    path:"backend/config/.env"
})
connectionDatabase()

// create server
const servver=app.listen(process.env.PORT,()=>{
    console.log(`success ${process.env.PORT}`)
})