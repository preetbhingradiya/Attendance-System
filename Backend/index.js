import express from "express"
import {config} from "dotenv"
import {connect}  from "./config/Admin.js";
import {SclAdmin} from "./routes/Admin/admin-route.js"

const app = express()
config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/school",SclAdmin)

app.listen(process.env.PORT,()=>{
    console.log(`Connect Port on ${process.env.PORT}`);
    connect();
})