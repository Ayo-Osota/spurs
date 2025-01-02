import express from "express";
import { login, signup } from "../controllers/auth.controller";
import { deleteUser, editUser, getUser } from "../controllers/user.controller";

const usersRouter = express.Router();

usersRouter.post('/signup', signup)
usersRouter.post('/login', login)


usersRouter.route('/:id').get(getUser).patch(editUser).delete(deleteUser)

export default usersRouter