import mongoose from "mongoose";

const SchoolDetails=new mongoose.Schema({
    facultys:[{
        _id:String,
        _fullName:String
    }],
    students:[{
        _id:String,
        _roleNo:Number,
        _fullName:String,
    }],
})

export const facultyStudentDetails=mongoose.model('AllfacultyStudent',SchoolDetails)