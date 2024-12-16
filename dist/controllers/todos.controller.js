"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.editTodo = exports.getTodo = exports.createTodo = exports.getAllTodos = exports.checkID = void 0;
const fs_1 = __importDefault(require("fs"));
const data = `${__dirname}/../temp-data/todos.json`;
const todos = JSON.parse(fs_1.default.readFileSync(data).toString());
const checkID = (req, res, next, val) => {
    if (val > todos.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};
exports.checkID = checkID;
function getAllTodos(req, res) {
    res.status(200).json({
        status: 'success',
        results: todos.length,
        data: {
            todos: todos
        }
    });
}
exports.getAllTodos = getAllTodos;
function createTodo(req, res) {
    const newId = todos[todos.length - 1].id + 1;
    const newTodo = Object.assign({ id: newId }, req.body);
    todos.push(newTodo);
    fs_1.default.writeFile(data, JSON.stringify(todos), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTodo
            }
        });
    });
}
exports.createTodo = createTodo;
function getTodo(req, res) {
    const id = +req.params.id;
    const todo = todos.find(todo => todo.id === id);
    res.status(200).json({
        status: 'success',
        results: todos.length,
        data: {
            todo: todo
        }
    });
}
exports.getTodo = getTodo;
function editTodo(req, res) {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const todoIndex = todos.findIndex((todo) => todo.id === +id);
        todos[todoIndex] = Object.assign(Object.assign({}, todos[todoIndex]), { title: title !== undefined ? title : todos[todoIndex].title, completed: completed !== undefined ? completed : todos[todoIndex].completed, updatedAt: new Date().toISOString() });
        res.status(200).json({
            status: 'success',
            data: {
                todo: todos[todoIndex],
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while editing the todo',
        });
    }
}
exports.editTodo = editTodo;
function deleteTodo(req, res) {
    try {
        const { id } = req.params;
        const todoIndex = todos.findIndex((todo) => todo.id === +id);
        todos.splice(todoIndex, 1);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while deleting the todo',
        });
    }
}
exports.deleteTodo = deleteTodo;
