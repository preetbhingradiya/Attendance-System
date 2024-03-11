import Router from "express";
import { RequsetToNewFaculty, facultyForm } from "../../controllers/faculty/School-Faculty.js";

export const SclFaculty = Router();

SclFaculty.post('/request/faculty',RequsetToNewFaculty)
SclFaculty.get('/faculty',facultyForm)
// SclAdmin.post('/admin/login',LoginAdmin)