import express from 'express';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import ConnectionDB from './config/db.js';
import UserRouter from './routes/userRouter.js';
import todoRouter from './routes/todoRouter.js';


const app=express();

app.use(express.json())
app.use(cookieParser())

app.use('/api/user', UserRouter)
app.use('/api/todo', todoRouter)
const PORT=9000;
ConnectionDB()

app.listen(PORT,()=>{
    console.log(chalk.red.bold("Listening Port on "), PORT)
})