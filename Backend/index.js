import express from "express"
import cors from "cors"
import {config} from "dotenv"
import {connect}  from "./config/Admin.js";
import {SclAdmin} from "./routes/Admin/Admin-route.js"
import { SclFaculty } from "./routes/Faculty/Faculty-route.js";
import cookie from "cookie-parser"
import { SclStudent } from "./routes/Student/Student-route.js";

const app = express()
config();
app.use(cors({
    credentials:true,
    origin:['http://localhost:3000','http://localhost:8000','http://localhost:4200']
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie())
app.set("view engine","ejs")

app.use("/api/v1/school",SclAdmin,SclFaculty,SclStudent)
// app.use("/api/v1/school",SclFaculty)

app.get('/api/v1/school',(req,res)=>{
    res.json("home page ! ")
})

app.listen(process.env.PORT,()=>{
    console.log(`Connect Port on ${process.env.PORT}`);
    connect();
})