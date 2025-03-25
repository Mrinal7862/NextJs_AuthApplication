
import {connect} from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody)

        // Check if the user  exists
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User doesnot exists"}, {status:400})
        }

        // check if the password is correct 
        const validPassword = await bcryptjs.compare(password, user.password)
        
        if(!validPassword){
            return NextResponse.json({error: "Invalid Password"}, {status:400})
        }

        // create token data 

        const tokenData  = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"1d"})

        const response = NextResponse.json({
            message: "Login Successful",
            success: true
        })
        response.cookies.set("token", token,{
            httpOnly:true,
        })

        return response

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}