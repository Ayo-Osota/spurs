import express from 'express'
import { login, loginRequired, signup } from '../controllers/auth.controller'
import { deleteUser, editUser, getUser } from '../controllers/user.controller'

const usersRouter = express.Router()

usersRouter.post('/signup', signup)
usersRouter.post('/login', login)

usersRouter
    .route('/')
    .get(loginRequired, getUser)
    .patch(loginRequired, editUser)
    .delete(loginRequired, deleteUser)

export default usersRouter
