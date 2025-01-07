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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTodos = getAllTodos;
exports.createTodo = createTodo;
const todos_model_1 = require("../models/todos.model");
const handleResponse_1 = require("../utils/handleResponse");
function getAllTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todos = yield todos_model_1.Todo.find({ users: req.user.userId });
            (0, handleResponse_1.sendSuccessResponse)(res, { data: todos });
        }
        catch (error) {
            console.error(error);
            (0, handleResponse_1.sendErrorResponse)(res, {});
        }
    });
}
function createTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, dueDate, reminderDate, repeat } = req.body;
            const newTodo = yield new todos_model_1.Todo({
                title,
                dueDate,
                reminderDate,
                repeat,
                createdBy: req.user.userId,
                users: [req.user.userId],
            }).save();
            (0, handleResponse_1.sendSuccessResponse)(res, { data: newTodo });
        }
        catch (error) {
            console.error(error);
            (0, handleResponse_1.sendErrorResponse)(res, {});
        }
    });
}
// export async function getTodo(req: Request, res: Response) {
//     try {
//         const { id } = req.params
//         const todo = await Todo.findOne({ _id: id, users: req.user.userId })
//         if (!todo) {
//             sendErrorResponse(res, {
//                 statusCode: 404,
//                 message: 'Todo not found',
//             })
//         } else {
//             sendSuccessResponse(res, { data: todo })
//         }
//     } catch (error) {
//         console.error(error)
//         sendErrorResponse(res, {})
//     }
// }
// export async function editTodo(req: Request, res: Response) {
//     try {
//         const { id } = req.params
//         const updates = req.body
//         const todo = await Todo.findOneAndUpdate(
//             { _id: id, users: req.user.userId },
//             updates,
//             { new: true, runValidators: true }
//         )
//         if (!todo) {
//             sendErrorResponse(res, {
//                 statusCode: 404,
//                 message: 'Todo not found',
//             })
//         } else {
//             sendSuccessResponse(res, { data: todo })
//         }
//     } catch (error) {
//         console.error('Error fetching todos:', error)
//         sendErrorResponse(res, { message: 'Failed to fetch todos' })
//     }
// }
// export async function deleteTodo(req: Request, res: Response) {
//     try {
//         const { id } = req.params
//         const todo = await Todo.findOneAndDelete({
//             _id: id,
//             users: req.user.userId,
//         })
//         if (!todo) {
//             sendErrorResponse(res, {
//                 statusCode: 404,
//                 message: 'Todo not found',
//             })
//         } else {
//             sendSuccessResponse(res, { message: 'Todo deleted', data: null })
//         }
//     } catch (error) {
//         console.error(error)
//         sendErrorResponse(res, {})
//     }
// }
