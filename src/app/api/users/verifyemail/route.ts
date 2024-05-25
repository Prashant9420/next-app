import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token,type } = reqBody;
    if(type === "VERIFY"){
      const user = await User.findOne({
        verifyToken: token,
        verifyTokenExpiry: { $gt: Date.now() },
      });
      
      if (!user) {
        return NextResponse.json({
          message: "Token is invalid or has expired",
          status: 400,
        });
      }
      user.isVerified = true;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
      await user.save();
      return NextResponse.json({
        success: true,
        message: "Email verified successfully",
        status: 200,
      });
    }else if(type === "RESET"){
      const user = await User.findOne({
        forgetPasswordToken: token,
        forgetPasswordTokenExpiry: { $gt: Date.now() },
      });
      
      if (!user) {
        return NextResponse.json({
          message: "Token is invalid or has expired",
          status: 400,
        });
      }
      // user.forgetPasswordToken = undefined;
      user.forgetPasswordTokenExpiry = undefined;
      await user.save();
      return NextResponse.json({
        success: true,
        message: "Email verified successfully",
        status: 200,
      });
    }
    return NextResponse.json({message:"everything's fine",success:true});
    
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
