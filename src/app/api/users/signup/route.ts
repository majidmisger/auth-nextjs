import {connectDB} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest,NextResponse, userAgent } from 'next/server';
import bcryptjs from 'bcryptjs';



connectDB()

export async function POST(request:NextRequest){
    const reqBody  =await request.json();
    

    //TODO : add validation



    const {username, email , password} = reqBody
    console.log('username ----',username)
    console.log("email--------",email)

    const user = await User.findOne({email})
    console.log("user",user)

    if(user){
        return NextResponse.json({message:'User already exists',success:false,exist:true})
    }

    // generate salt and hash password
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);

    //insert the data into db 
    const newUser = new User({
        username,
        email,
        password: hashPassword
    });
    console.log("ne-user",newUser)
    const savedUser = await newUser.save();

    console.log(savedUser)
    return NextResponse.json({message:'User created successfully',success:true,savedUser})

}

export async function GET(request:NextRequest){
    
}