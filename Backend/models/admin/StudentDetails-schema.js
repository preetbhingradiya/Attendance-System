import mongoose from "mongoose";

const SchoolDetails=new mongoose.Schema({
    students:[{
        _id:String,
        _fullName:String
    }],
})

export const studentDetails=mongoose.model('AllstudentsId',SchoolDetails)