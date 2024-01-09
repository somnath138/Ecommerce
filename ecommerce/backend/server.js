const app=require("./app");
const dotenv=require("dotenv");//npm i dotenv
const connectDatabase=require("./config/database")
//console.log(you) randomly eisob likha ke bole uncaught error eta keo handle korte lage
process.on("uncaughtException",(err)=>{
    console.log(`ERROR: ${err.message}`);
    console.log(`shutting down the server due to the uncaughtException error`);
    process.exit(1)
})
//config
dotenv.config({path:"backend/config/config.env"});//connect to the path
//connectDatabase
connectDatabase()

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on  http://localhost:${process.env.PORT}`)
})

//console.log(helloxw)

//unhandled promise rejection
//mainly mongodb url ee kono rokom er error ele eta diye fixed hobe
process.on("unhandledRejection",(err)=>{
    console.log(`ERROR: ${err.message}`);
    console.log(`shutting down the server due to the unhandled rejection`);
    
    server.close(()=>{
        process.exit(1);
    })
})