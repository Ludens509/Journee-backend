import express from 'express';
import dotenv from "dotenv";
import {globalErr , log}from './middlewares/middleware.mjs';
import postRoutes from "./routes/postRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import connectDB from "./db/conn.mjs";


//setup
dotenv.config();
const app = express();
const PORT = process.env.VITE_PORT || 3001;

//Db connection
connectDB()

//Middleware
app.use(express.json());
app.use(log);

//Routes
app.use("/api/posts", postRoutes);
app.use("/api/users",userRoutes);

//Global middleware
app.use(globalErr);



app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`)
})