import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const connectionStr = process.env.mongoURI || "";
async function connectDb(){
    try{
    await mongoose.connect(connectionStr);

    console.log(" Connection set with DB");
    }catch(err){
        console.error(`Error - ${err.message}`);
        process.exit(1);
    }

}
export default connectDb;