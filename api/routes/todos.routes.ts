import express from 'express'
import {
    createTodo,
    deleteTodo,
    editTodo,
    getAllTodos,
    getTodo,
} from '../controllers/todos.controller'
import { loginRequired } from '../controllers/auth.controller'

const todosRouter = express.Router()

todosRouter
    .route('/')
    .get(loginRequired, getAllTodos)
    .post(loginRequired, createTodo)
todosRouter
    .route('/:id')
    .get(loginRequired, getTodo)
    .patch(loginRequired, editTodo)
    .delete(loginRequired, deleteTodo)

export default todosRouter
