import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    // taking request body from request in json format using await first (in NextJs)
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // check for empty fields
    if (!username || !email || !password)
      return NextResponse.json({ message: "incomplete fields" });
    const user = await User.findOne({ email });

    // check for user already exists
    if (user)
      return NextResponse.json({
        message: "User already exists!",
        status: 400,
      });
    
      //   hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password,salt);
    
    // creating new user and saving it
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    // sending verification mail
    await sendMail({email,emailType:"VERIFY",userId:savedUser._id});
    return NextResponse.json({ message: "User created successfully" ,success:true, status: 201, data: savedUser});


  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
