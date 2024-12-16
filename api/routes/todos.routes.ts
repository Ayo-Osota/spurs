import express from "express";
import { createTodo, deleteTodo, editTodo, getAllTodos, getTodo } from '../controllers/todos.controller';

const todosRouter = express.Router();

todosRouter.route('/').get(getAllTodos).post(createTodo)
todosRouter.route('/:id').get(getTodo).patch(editTodo).delete(deleteTodo)

export default todosRouter