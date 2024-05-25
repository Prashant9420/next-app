import { NextRequest,NextResponse } from "next/server";
import { sendMail } from "@/helpers/mailer";
export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email,emailType,userId} = reqBody;
        const mailResponse = await sendMail({email,emailType,userId});
        if(mailResponse){
            return NextResponse.json({message:"Mail sent successfully",status:200,success:true});
        }
        return NextResponse.json({message:"Mail not sent",status:400,success:false});

    } catch (error:any) {
        return NextResponse.json({ message: error.message, status: 500 });
    }
}