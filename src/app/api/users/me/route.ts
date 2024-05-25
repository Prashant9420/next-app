import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { error } from "console";

connect()

export async function GET(request:NextRequest){
    try {
        const userId = await getDataFromToken(request);
        if(!userId){
            return NextResponse.json({
                message:"Invalid Token",status:'400'
            })
        }
        const user = await User.findById(userId).select('-password');
        if(!user){
            return NextResponse.json({
                message:"User doesn't exist with this token",status:'400'
            })
        }
        return NextResponse.json({
            data:user,status:'200'
        })  
    } catch (error) {
        
    }
}