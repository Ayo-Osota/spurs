"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkID = void 0;
exports.getAllTodos = getAllTodos;
exports.createTodo = createTodo;
exports.getTodo = getTodo;
exports.editTodo = editTodo;
exports.deleteTodo = deleteTodo;
const fs_1 = __importDefault(require("fs"));
const todos_model_1 = require("../models/todos.model");
const handleResponse_1 = require("../utils/handleResponse");
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
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todos = yield todos_model_1.Todo.find();
            (0, handleResponse_1.sendSuccessResponse)(res, { data: todos });
        }
        catch (error) {
            (0, handleResponse_1.sendErrorResponse)(res, {});
        }
    });
}
function createTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, dueDate, reminderDate, repeat } = req.body;
            const newTodo = yield new todos_model_1.Todo({
                title, dueDate,
                reminderDate,
                repeat,
                createdBy: 'ayo'
            }).save();
            (0, handleResponse_1.sendSuccessResponse)(res, { data: newTodo });
        }
        catch (error) {
            (0, handleResponse_1.sendErrorResponse)(res, {});
        }
    });
}
function getTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const todo = yield todos_model_1.Todo.findById(id);
            if (!todo) {
                (0, handleResponse_1.sendErrorResponse)(res, { statusCode: 404, message: 'Todo not found' });
            }
            else {
                (0, handleResponse_1.sendSuccessResponse)(res, { data: todo });
            }
        }
        catch (error) {
            (0, handleResponse_1.sendErrorResponse)(res, {});
        }
    });
}
function editTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const updates = req.body;
            const todo = yield todos_model_1.Todo.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
            if (!todo) {
                (0, handleResponse_1.sendErrorResponse)(res, { statusCode: 404, message: 'Todo not found' });
            }
            else {
                (0, handleResponse_1.sendSuccessResponse)(res, { data: todo });
            }
        }
        catch (error) {
            (0, handleResponse_1.sendErrorResponse)(res, {});
        }
    });
}
function deleteTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const todo = yield todos_model_1.Todo.findByIdAndDelete(id);
            if (!todo) {
                (0, handleResponse_1.sendErrorResponse)(res, { statusCode: 404, message: 'Todo not found' });
            }
            else {
                (0, handleResponse_1.sendSuccessResponse)(res, { message: 'Todo deleted', data: null });
            }
        }
        catch (error) {
            (0, handleResponse_1.sendErrorResponse)(res, {});
        }
    });
}
