import mongoose from "mongoose";
import {config} from "dotenv";
config();

export const connect = async() =>{
    await mongoose.connect(process.env.ADMIN_URL);
    console.log("Coonect to the databse");
}

