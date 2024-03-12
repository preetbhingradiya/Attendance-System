import { Faculty } from "../../models/Faculty/Faculty-Schema.js";
import { facultyDetails } from "../../models/Admin/FacultyDetails-Schema.js";
import { trasport } from "../../config/Maile.js";

export const RequsetToNewFaculty = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
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

  if (checkEmail) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Email id is alerdy use. Please use differnet id",
      });
  } else {
    let faculty = await Faculty.create({
      _firstName: firstName,
      _lastName: lastName,
      _Email: email,
      _password: password,
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

    res.status(200).json({
        success: true,
        Message: "successfull send request to scool admin.",
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
    if(confirmEmail._Email == email && confirmEmail._password == password)
    {
      return res.status(200).json({success:true,Message:`Welcome back ${confirmEmail._firstName+ " " + confirmEmail._lastName}`})
    }
    else{
      return res.status(401).json({success:false,Message:"Incorrect Email or Password"})
    } 
  }
  else{
    return res.status(401).json({success:false,message:"Please Enter valid email or try this email to sing up"})
  }
}

export const facultyForm = (req, res) => {
  res.render("faculty");
};
