import chalk from "chalk";
import mongoose from "mongoose";
import { dbUrl } from './config.js';

const ConnectionDB=async()=>{
    try {
        await mongoose.connect(dbUrl)
        console.log(`Connection Database ka ${chalk.green.bold(dbUrl)}`)
    } catch (error) {
        console.log(chalk.red.bold("Errorka Databaseka "), error)
    }
}

export default ConnectionDB;