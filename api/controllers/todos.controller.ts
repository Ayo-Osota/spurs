import { Request, Response } from "express";
import { Todo } from '../models/todos.model';
import { sendErrorResponse, sendSuccessResponse } from '../utils/handleResponse';

export async function getAllTodos(req: Request, res: Response) {
    console.log('here');

    try {
        console.log('here 2');

        const todos = await Todo.find()

        sendSuccessResponse(res, { data: todos })
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, {})
    }
}

export async function createTodo(req: Request, res: Response) {
    try {
        const { title, dueDate,
            reminderDate,
            repeat } = req.body

        const newTodo = await new Todo({
            title, dueDate,
            reminderDate,
            repeat,
            createdBy: 'ayo'
        }).save();

        sendSuccessResponse(res, { data: newTodo })
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, {})
    }

}

export async function getTodo(req: Request, res: Response) {
    try {
        const { id } = req.params
        const todo = await Todo.findById(id)

        if (!todo) {
            sendErrorResponse(res, { statusCode: 404, message: 'Todo not found' })
        } else {
            sendSuccessResponse(res, { data: todo })
        }
    } catch (error) {
        console.error(error);

        sendErrorResponse(res, {})
    }
}

export async function editTodo(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const updates = req.body;

        const todo = await Todo.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!todo) {
            sendErrorResponse(res, { statusCode: 404, message: 'Todo not found' })
        } else {
            sendSuccessResponse(res, { data: todo })
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, {})
    }
}

export async function deleteTodo(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            sendErrorResponse(res, { statusCode: 404, message: 'Todo not found' })
        } else {
            sendSuccessResponse(res, { message: 'Todo deleted', data: null })
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, {})
    }
}
