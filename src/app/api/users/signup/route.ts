
import {connect} from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";



connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody)

        // Check if  the user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User Already Exists"}, {status:400})
        }

        // hash password 

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        //create New user 
        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })


        const savedUser = await newUser.save()

        console.log(savedUser)

        // send verification email 

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User Created Successfully!",
            success: true,
            savedUser
        })


        
    } catch (error:any) {
        console.log("Error message: ", error.message)
        return NextResponse.json({error: error.message}, {status:500})
    }
}