import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendMail } from "@/helpers/mailer";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email });
    await sendMail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json({
      success: true,
      message: "email for reset link has been sent",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
