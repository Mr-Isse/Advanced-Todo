import chalk from "chalk";
import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/config.js";




export const registerUser=async(req,res)=>{
    try {
        const{username,email,password}=req.body;

        const IsUserExits=await User.findOne({
            $or:[
                {
                    username:username.toLowerCase()
                },
                {
                    email:email.toLowerCase()
                }
            ]
        })
    if(IsUserExits){
        return res.status(400).send("Username or email Allready Exits")
    }
    const UserInfo= new User({
        username:username,
        email:email,
        password:password
    })
    await UserInfo.save();
    UserInfo.password=undefined;
    res.status(201).send(UserInfo)
    } catch (error) {
        console.log(chalk.red.bold("Errorka registerka"),error)
    }
}

export const loginUser=async(req,res)=>{
    try {
        const{email,password}=req.body;
        const IsUserExits=await User.findOne({
            email:email
        })
        if(!IsUserExits){
            return res.status(400).send("email Not Found please Register Now")
        }

        const IspasswordCorrect= await IsUserExits.ComparePassword(password)
        if(!IspasswordCorrect){
            return res.status(400).send("Incorrect Password")
        }

        const expiresIn= 7 * 24 * 60 * 60;

        const token=jwt.sign({_id: IsUserExits._id}, JWT_SECRET,{expiresIn})

        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            maxAge: expiresIn * 1000
        })
        const user={
            token: token,
            username: IsUserExits.username,
            email: IsUserExits.email,
            id: IsUserExits._id
        }

        IsUserExits.password=undefined;
        res.status(200).send({user})

    } catch (error) {
        console.log(chalk.red.bold("Errorka Login ka"),error)
    }
}