import mongoose from "mongoose";

const AdmionSchema=new mongoose.Schema({
    _adminId:Number,
    _name:String,
    _password:String
})

export const Admin = mongoose.model("SchollAdmin",AdmionSchema)