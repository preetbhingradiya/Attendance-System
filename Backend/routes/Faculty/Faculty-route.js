import Router from "express";
import { RequsetToNewFaculty, facultyForm, loginFaculty } from "../../controllers/faculty/School-Faculty.js";

export const SclFaculty = Router();

SclFaculty.get('/faculty',facultyForm)
SclFaculty.post('/request/faculty',RequsetToNewFaculty)
SclFaculty.post('/faculty/login',loginFaculty)
