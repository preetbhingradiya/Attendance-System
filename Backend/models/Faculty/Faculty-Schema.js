import mongoose from "mongoose";

const FacultySChema = new mongoose.Schema({
    _firstName:String,
    _lastName:String,
    _Email:String,
    _password:String,
    _contectNo:String,
    _experience:String,
    _subjects:[],
    _previousSchool:String,
    _currentSalary:Number,
    _expectedSalary:Number,
    _requestdAt:Date
})

export const Faculty = mongoose.model("schoolfaculty",FacultySChema);