import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.listen(process.env.PORT,()=>{
    console.log(`process is running on the port${process.env.PORT}`)
})



