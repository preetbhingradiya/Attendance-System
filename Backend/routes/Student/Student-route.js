import Router from "express";
import { loginStudnet, requestStudent, studentForm } from "../../controllers/Student/School-Student.js";
import passport from "passport";
import {} from "../../Authentication/auth.js"
import session from "express-session";

export const SclStudent = Router();

SclStudent.get('/student',studentForm)
SclStudent.post('/request/student',requestStudent)
SclStudent.post('/student/login',loginStudnet)

