import chalk from 'chalk';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

export const authanticated=async(req,resizeBy,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return resizeBy.status(401).send("Awood umalhid inaa halkan gasho")
        }
        const decode=jwt.verify(token,JWT_SECRET);
        if(!decode){
            return resizeBy.status(401).send("token wuu kaa dhacay")
        }
        req.user=decode;
        next()
    } catch (error) {
        console.log(chalk.red.bold("Errorka authanticate"),error)
    }
}