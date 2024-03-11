import { Faculty } from "../../models/Faculty/Faculty-Schema.js";
import { facultyStudentDetails } from "../../models/Admin/Faculty-Student-Details-Schema.js";

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

    let addFaculty = await facultyStudentDetails.find();

    let data = addFaculty.map((val) => val.id);
    if (data.length != 0) {
      let datas = await facultyStudentDetails.findById(...data);
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
      await facultyStudentDetails.create({
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

export const facultyForm = (req, res) => {
  res.render("faculty");
};
