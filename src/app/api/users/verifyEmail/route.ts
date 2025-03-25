import {connect} from "@/dbConfig/dbconfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel"

connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry:{$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error: "Invalid token"})
        }
        console.log(user)
        
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry  = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email Verified", 
            success: true
        })
    } catch (error: string) {
        return NextResponse.json({error : error.message}, {status: 500})
    }
}