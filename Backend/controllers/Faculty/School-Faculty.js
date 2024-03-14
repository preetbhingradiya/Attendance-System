import { Faculty } from "../../models/Faculty/Faculty-Schema.js";
import { facultyDetails } from "../../models/Admin/FacultyDetails-Schema.js";
import { trasport } from "../../config/Maile.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const RequsetToNewFaculty = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    contect,
    subject,
    experience,
    totalExperience,
    previousSchool,
    currentSalary,
    exptectedSalary,
  } = req.body;

  //Send Email
  {
    const mailOptons = {
      from: "preetbhingradiya6@gmail.com",
      to: email,
      subject: `Faculty purpose`,
      html: `Hello ${firstName} ${lastName},
          <br /><br />
          I am Preet from Gurukul School Admin. I hope you are fine and well and currently you have submitted the request faculty form which on Gurukul School Admin Section
          <br />
          Thanks for submitting it.
          <br /><br />
          Thank you, <br/>
          preet`,
    };

    trasport.sendMail(mailOptons, (err, Info) => {
      if (err) return console.log(err);
    });
  }

  let checkEmail = await Faculty.findOne({ _Email: email });
  let hashPassword= await bcrypt.hash(password,10);
  if (checkEmail) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Email id is alerdy use. Please use differnet email",
      });
  } else {
    let faculty = await Faculty.create({
      _firstName: firstName,
      _lastName: lastName,
      _Email: email,
      _password: hashPassword,
      _contectNo:contect,
      _experience: experience+' '+totalExperience,
      _subjects: subject,
      _previousSchool: previousSchool,
      _currentSalary: currentSalary,
      _expectedSalary: exptectedSalary,
      _requestdAt: Date.now(),
    });

    let addFaculty = await facultyDetails.find();

    let data = addFaculty.map((val) => val.id);
    if (data.length != 0) {
      let datas = await facultyDetails.findById(...data);
      datas.facultys.push({
        _id: faculty.id,
        _fullName: faculty._firstName + " " + faculty._lastName,
      });
      await datas.save();
    } else {
      let facultyIdAndName = addFaculty.map((val) => val.facultys);
      facultyIdAndName.push({
        _id: faculty.id,
        _fullName: faculty._firstName + " " + faculty._lastName,
      });
      await facultyDetails.create({
        facultys: facultyIdAndName,
      });
    }

    let token = jwt.sign({_id:faculty._id},process.env.FACULTY_TOKEN)
    res.status(200).cookie("sclFacultyToken",token).json({
        success: true,
        Message: "successfull sign up of school faculty deparment",
        FacultyDetails:faculty
    });
  }
};

export const loginFaculty=async(req,res)=>{
  const {
    email,
    password,
  } = req.body

  let confirmEmail = await Faculty.findOne({ _Email: email });

  if(confirmEmail){
    let confirmPassword = await bcrypt.compare(password,confirmEmail._password)
    if(confirmEmail._Email == email && confirmPassword)
    {
      let token = jwt.sign({_id:confirmEmail._id},process.env.FACULTY_TOKEN)
      return res.status(200).cookie("sclFacultyToken",token,{ maxAge: 5 * 60 * 1000,}).json({success:true,Message:`Welcome back ${confirmEmail._firstName+ " " + confirmEmail._lastName}`})
    }
    else{
      return res.status(401).json({success:false,Message:"Incorrect Email or Password"})
    } 
  }
  else{
    return res.status(401).json({success:false,message:"Please Enter valid email or try this email to sing up"})
  }
}

export const googleAuthentication=async(req,res)=>{
  let user=req.user.email
  let confirmEmail = await Faculty.findOne({ _Email:user});

  if(confirmEmail){
      let token = jwt.sign({_id:confirmEmail._id},process.env.FACULTY_TOKEN)
      return res.status(200).cookie("sclFacultyToken",token,{ maxAge: 5 * 60 * 1000,}).json({success:true,Message:`Welcome back ${confirmEmail._firstName+ " " + confirmEmail._lastName}`})
  }
  else{
    return res.redirect("/api/v1/school/faculty/auth/google/failure")
  }
}

export const facultyForm = (req, res) => {
  res.render("faculty");
};