import Router from "express";
import { loginStudnet, requestStudent, studentForm } from "../../controllers/Student/School-Student.js";


export const SclStudent = Router();

SclStudent.get('/student',studentForm)
SclStudent.post('/request/student',requestStudent)
SclStudent.post('/student/login',loginStudnet)
