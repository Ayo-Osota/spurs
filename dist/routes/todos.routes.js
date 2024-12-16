"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_controller_1 = require("../controllers/todos.controller");
const todosRouter = express_1.default.Router();
todosRouter.param('id', todos_controller_1.checkID);
todosRouter.route('/').get(todos_controller_1.getAllTodos).post(todos_controller_1.createTodo);
todosRouter.route('/:id').get(todos_controller_1.getTodo).patch(todos_controller_1.editTodo).delete(todos_controller_1.deleteTodo);
exports.default = todosRouter;
