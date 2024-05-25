import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token,newPassword } = reqBody;
        const user = await User.findOne({ forgetPasswordToken: token});
        if (!user) {
            return NextResponse.json({ message: "Token is invalid or has expired", status: 400 });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword,salt);
        user.password = hashedPassword;
        user.forgetPasswordToken = undefined;
        await user.save();
        return NextResponse.json({ message: "Password reset successfully",success:true , status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message, status: 500 });
        
    }
}