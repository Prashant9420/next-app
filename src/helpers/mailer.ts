import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    }
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  export async function sendMail({email,emailType,userId}:any) {
    // send mail with defined transport object
    try {
        const token = await bcryptjs.hash(userId.toString(), 10);
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken:token,
                verifyTokenExpiry:Date.now()+3600000
        })}
        else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,{
                forgetPasswordToken:token,
                forgetPasswordTokenExpiry:Date.now()+3600000
            })
        }
        const mailResponse = await transporter.sendMail({
          from: 'prashantpal2468@gmail.com',
          to: email,
          subject: emailType==="VERIFY"?"User Verification":"Password Reset",
          text: emailType==="VERIFY"?"Click on the link to verify your email":"Click on the link to reset your password",
          html: `<><a href='${process.env.DOMAIN}/verifyemail?token=${token}' >VERIFY</a><br>
                <p>copy and paste the below link if above link is not working:</p><br>
                <p>${process.env.DOMAIN}/verifyemail?token=${token}&type=${emailType}</p></>
          `, // html body
        });
      
        console.log("Message sent: %s", mailResponse.messageId);
        return mailResponse;
    } catch (error) {
        console.log(error);
        
    }
  }