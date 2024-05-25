import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connect();
export async function POST(request: NextRequest) {
  try {
    // taking request body from request in json format using await first (in NextJs)
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // check for empty fields
    if (!email || !password)
      return NextResponse.json({ message: "incomplete fields" });

    const user = await User.findOne({ email });

    // check for user already exists
    if (!user)
      return NextResponse.json({
        message: "User does not exist!",
        status: 400,
      });
    // const validPassword = await bcryptjs.compare(password, user.password);
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword)
      return NextResponse.json({ message: "Invalid Password", status: 400 });
    // creating token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET!,{expiresIn: "1d"});

    const response =  NextResponse.json({
      message: "User logged in successfully",
      success: true,
      status: 200,
      data: user,
    });
    response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure:true
    })
    return response;

  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
