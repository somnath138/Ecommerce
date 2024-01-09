// install express mongoose and dotenv
// npm i express mongoose dotenv
// "start": "node backend/server.js", backend er modhhe jeee server.js ache ota start kore dibe start command likhlei

const express =require("express");
const app=express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
const errorMiddleware=require("./middleware/error")
//Route Imports
const product=require("./routes/productRoute")
const user=require("./routes/userRoute")

app.use("/api/v1",product);
app.use("/api/v1",user);

app.use(errorMiddleware)

module.exports=app;
//export app

