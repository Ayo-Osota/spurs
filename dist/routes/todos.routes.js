"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_controller_1 = require("../controllers/todos.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const todosRouter = express_1.default.Router();
todosRouter
    .route('/')
    .get(auth_controller_1.loginRequired, todos_controller_1.getAllTodos)
    .post(auth_controller_1.loginRequired, todos_controller_1.createTodo);
// todosRouter
//     .route('/:id')
//     // .get(loginRequired, getTodo)
//     .patch(loginRequired, editTodo)
//     .delete(loginRequired, deleteTodo)
exports.default = todosRouter;
