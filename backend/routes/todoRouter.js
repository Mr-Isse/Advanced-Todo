import express from 'express';

import { createTodo, deleteTodo, getTodo, UpdateTodo } from '../controllers/TodoController.js';
import { authanticated } from './../middlewares/Authanticate.js';

const todoRouter=express.Router();

todoRouter.post('/createTodo',authanticated, createTodo)
todoRouter.get('/getTodo',authanticated,getTodo)
todoRouter.put('/updateTodo/:id',authanticated,UpdateTodo)
todoRouter.delete('/deleteTodo/:id',authanticated,deleteTodo)

export default todoRouter;