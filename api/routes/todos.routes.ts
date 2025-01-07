import express from 'express'
import {
    createTodo,
    deleteTodo,
    editTodo,
    getAllTodos,
    getTodo,
} from '../controllers/todos.controller'
import { protect } from '../controllers/auth.controller'

const todosRouter = express.Router()

todosRouter.route('/').get(protect, getAllTodos).post(createTodo)
todosRouter.route('/:id').get(getTodo).patch(editTodo).delete(deleteTodo)

export default todosRouter
