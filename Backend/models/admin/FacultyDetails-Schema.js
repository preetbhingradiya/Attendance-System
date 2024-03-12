import mongoose from "mongoose";

const SchoolDetails=new mongoose.Schema({
    facultys:[{
        _id:String,
        _fullName:String
    }],
})

export const facultyDetails=mongoose.model('AllfacultysId',SchoolDetails)