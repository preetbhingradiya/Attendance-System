import { studentDetails } from "../../models/Admin/StudentDetails-schema.js";
import { Student } from "../../models/Student/Stuedent-schema.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const requestStudent = async (req, res) => {
  const {
    fullname,
    email,
    password,
    studentContect,
    parentContect,
    std,
    previousScl,
    previousStdPer,
  } = req.body;

  let previousStd = Number(std);
  let checkEmail = await Student.findOne({ _Email: email });
  let hashPassword= await bcrypt.hash(password,10);


  if (checkEmail) {
    return res.status(401).json({
      success: false,
      message: "Email id is alerdy use. Please use differnet id",
    });
  } else {
    let student = await Student.create({
      _fullname: fullname,
      _Email: email,
      _password: hashPassword,
      _studentContect: studentContect,
      _parentContect: parentContect,
      _std: std + "th",
      _previousStd: previousStd - 1 + "th",
      _previousScl:previousScl,
      _previousStdPercentage: previousStdPer + "%",
      _requestdAt: Date.now(),
    });

    let addStudent = await studentDetails.find();

    let data = addStudent.map((val) => val.id);
    if (data.length != 0) {
      let datas = await studentDetails.findById(...data);
      datas.students.push({
        _id: student.id,
        _fullName: fullname,
      });
      await datas.save();
    } else {
      let studentIdAndName = addStudent.map((val) => val.facultys);
      studentIdAndName.push({
        _id: student.id,
        _fullName: fullname,
      });
      await studentDetails.create({
        students: studentIdAndName,
      });
    }

    let token = jwt.sign({ _id: student._id }, process.env.STUDENT_TOKEN);
    res.status(200).cookie("sclStudentToken", token).json({
      success: true,
      Message: "successfull sign up to school student deparment",
      FacultyDetails: student,
    });
  }
};

export const loginStudnet = async(req,res)=>{
    const {
        email,
        password,
      } = req.body
    
      let confirmEmail = await Student.findOne({ _Email: email });
    
      if(confirmEmail){
        let confirmPassword = await bcrypt.compare(password,confirmEmail._password)
        if(confirmEmail._Email == email && confirmPassword)
        {
          let token = jwt.sign({_id:confirmEmail._id},process.env.STUDENT_TOKEN)
          return res.status(200).cookie("sclStudentToken",token,{ maxAge: 5 * 60 * 1000,}).json({success:true,Message:`Welcome back ${confirmEmail._fullname}`})
        }
        else{
          return res.status(401).json({success:false,Message:"Incorrect Email or Password"})
        } 
      }
      else{
        return res.status(401).json({success:false,message:"Please Enter valid email or try this email to sing up"})
      }
}

export const studentForm = (req, res) => {
  res.render("student");
};
