import { connectDB } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse, userAgent } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

connectDB()


export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        // destructuring reqBody
        const { email, password } = reqBody;


        console.log('email ----', email)
        console.log("password--------", password)

        // find the user 
        const user = await User.findOne({ email })
        console.log("user", user)

        //check if user exist
        if (!user) {
            console.log("🚀 ~ POST ~ user: 27", user)
            return NextResponse.json({ message: 'User does not exist', success: false, exist: false }, { status: 404 })
        }

        //check password
        if (!bcryptjs.compare(password, user.password)) {
            console.log("🚀 ~ POST ~ bcryptjs:")
            return NextResponse.json({ message: 'Invalid credentials', success: false, exist: true })
        }


        //create token data 
        const tokenData = {
            _id: user._id,
            email: user.email,
            username: user.username
        }
        console.log("🚀 ~ POST ~ tokenData:", tokenData)

        //generate JWT token
        //TODO :GET FROM ENV
        //FIXME :
        const token = await jwt.sign(tokenData, "JWTOKEN", { expiresIn: '1d' })
        console.log("token --------", token)

        //create next response 
        const response = NextResponse.json({ message: 'Login successfull', success: true, exist: true })

        // set Token in the response cookies
        response.cookies.set('token', token, {
            httpOnly: true,
        })

        return response
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false,
        },
            { status: 500 })
    }
}