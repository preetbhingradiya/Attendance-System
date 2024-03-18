import mongoose from "mongoose";

const StudentSChema = new mongoose.Schema({
    _fullname:String,
    _Email:String,
    _password:String,
    _parentContect:String,
    _studentContect:String,
    _std:String,
    _previousStd:String,
    _previousScl:String,
    _previousStdPercentage:String,
    _requestdAt:Date
})

export const Student = mongoose.model("schoolstudent",StudentSChema);