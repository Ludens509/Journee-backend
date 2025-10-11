import express from 'express'
import dotenv from "dotenv"
import {globalErr , log}from './middlewares/middleware.mjs';

//setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());
app.use(log);

//Routes

//Global middleware
app.use(globalErr);



app.listen(PORT,()=>{
    console.log(`Server running on poort: ${PORT}`)
})