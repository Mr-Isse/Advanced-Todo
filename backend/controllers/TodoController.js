import chalk from "chalk";
import Todo from "../models/TodoModel.js";


export const createTodo=async(req,res)=>{
    try {
        const{title,description,status}=req.body;

        const todo=await Todo.create({
            user:req.user._id,
            title:title,
            description:description,
            status:status
        })

        res.status(201).send({todo})

    } catch (error) {
        console.log(chalk.red.bold("Errorka create Todo"),error)
    }
}
export const getTodo=async(req,res)=>{
    try {
        const todos= await Todo.find({
        user:req.user._id
    })
    res.status(200).send(todos)
    } catch (error) {
        console.log(chalk.red.bold("Errorka Get"),error)
    }
}

export const UpdateTodo=async(req,res)=>{
    try {
    const{id}=req.params;
    const{title,description,status}=req.body;
    const UpdateTodos= await Todo.findByIdAndUpdate(
        id,
        {title:title,description:description,status:status},
        {new: true}
    )
    res.status(202).send({UpdateTodos})
    } catch (error) {
        console.log(chalk.red.bold("Errorka Update ka"),error)
    }
}
export const deleteTodo=async(req,res)=>{
    try {
        const {id}= req.params;
        const DelteTodo=await Todo.findByIdAndDelete(
            id
        )
        res.status(200).send({message: "Deleted Successfully", DelteTodo})
    } catch (error) {
        console.log(chalk.red.bold("Errorka delete ka"),error)
    }
}