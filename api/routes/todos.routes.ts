import express, { Request, Response } from "express";
import { checkID, createTodo, deleteTodo, editTodo, getAllTodos, getTodo } from '../controllers/todos.controller';

const todosRouter = express.Router();

todosRouter.param('id', checkID)

todosRouter.route('/').get(getAllTodos).post(createTodo)
todosRouter.route('/:id').get(getTodo).patch(editTodo).delete(deleteTodo)

export default todosRouter