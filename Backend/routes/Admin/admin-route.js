import Router from "express";
import  {AdminOfSchool, LoginAdmin}  from "../../controllers/Admin/School-Admin.js";

export const SclAdmin = Router();

SclAdmin.post('/admin',AdminOfSchool)
SclAdmin.post('/admin/login',LoginAdmin)
