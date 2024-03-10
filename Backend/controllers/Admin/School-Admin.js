import { Admin } from "../../models/admin/Admin-Schema.js"

export const AdminOfSchool=async(req,res)=>{
    let {_AdminId,name,password}=req.body
    const admin = await Admin.create({
        _adminId:_AdminId,
        _name:name,
        _password:password
    })

    res.send(admin);
}

export const LoginAdmin=async(req,res)=>{

    let {_adminId,name,password}=req.body
    const findAdmin=await Admin.findOne({_adminId});

    if(findAdmin){
        if(findAdmin._name == name && findAdmin._password == password){
            return res.status(200).json({success:true,Message:"Welcome back Admin of gurukul school"})
        }
        else{
            return res.status(400).json({success:false,Message:"Please check name or password and Try again.."})
        }
    }
    else{
        res.status(400).json({succecc:false,message:"Please Enter valid Admin Id"})
    }

}