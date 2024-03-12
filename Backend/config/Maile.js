import nodemailer from "nodemailer";

export const trasport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
})