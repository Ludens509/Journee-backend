import express from 'express';
import dotenv from "dotenv";
import {globalErr , log}from './middlewares/middleware.mjs';
import postRoutes from "./routes/postRoutes.mjs"

//setup
dotenv.config();
const app = express();
const PORT = process.env.VITE_PORT || 3001;

//Middleware
app.use(express.json());
app.use(log);

//Routes
app.use("/api/posts", postRoutes);

//Global middleware
app.use(globalErr);



app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`)
})