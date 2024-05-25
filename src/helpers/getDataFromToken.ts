import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
    const token = request.cookies.get("auth-token")?.value || "";
    if (!token) {
        return null;
    }
    try {
        const data:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return data._id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}