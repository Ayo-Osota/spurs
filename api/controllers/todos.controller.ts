import fs from 'fs';
import { Request, Response } from "express";
import { Todo } from '../models/todos.model';
import mongoose from 'mongoose';
import { sendErrorResponse, sendSuccessResponse } from '../utils/handleResponse';

const data = `${__dirname}/../temp-data/todos.json`

const todos = JSON.parse(fs.readFileSync(data).toString())

export const checkID = (req, res, next, val) => {
    if (val > todos.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    next()
}

export async function getAllTodos(req: Request, res: Response) {
    try {
        const todos = await Todo.find()

        sendSuccessResponse(res, { data: todos })
    } catch (error) {
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
            userId: 'ayo'
        }).save();

        sendSuccessResponse(res, { data: newTodo })
    } catch (error) {
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
        sendErrorResponse(res, {})
    }
}
