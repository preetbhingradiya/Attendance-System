import Router from "express";
import passport from "passport";
import {} from "../../Authentication/Facultyauth.js"
import session from "express-session";
import { RequsetToNewFaculty, facultyForm, googleAuthentication, loginFaculty } from "../../controllers/Faculty/School-Faculty.js";

export const SclFaculty = Router();

SclFaculty.get('/faculty',facultyForm)
SclFaculty.post('/request/faculty',RequsetToNewFaculty)
SclFaculty.post('/faculty/login',loginFaculty)

SclFaculty.use(session({
    secret:process.env.FACULTY_TOKEN,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))
SclFaculty.use(passport.initialize())
SclFaculty.use(passport.session())

SclFaculty.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

SclFaculty.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/api/v1/school/auth/google/success',
        failureRedirect: '/api/v1/school/auth/google/failure'
}));

SclFaculty.get("/auth/google/success",googleAuthentication)

SclFaculty.get("/auth/google/failure",(req,res)=>{
    res.status(400).json({suceess:false,message:"Please try sign up to this email id"})
})