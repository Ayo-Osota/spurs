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

export function getTodo(req: Request, res: Response) {
    const id = +req.params.id;
    const todo = todos.find(todo => todo.id === id)
    res.status(200).json({
        status: 'success',
        results: todos.length,
        data: {
            todo: todo
        }
    })
}

export function editTodo(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const todoIndex = todos.findIndex((todo: any) => todo.id === +id);

        todos[todoIndex] = {
            ...todos[todoIndex],
            title: title !== undefined ? title : todos[todoIndex].title,
            completed: completed !== undefined ? completed : todos[todoIndex].completed,
            updatedAt: new Date().toISOString(),
        };

        res.status(200).json({
            status: 'success',
            data: {
                todo: todos[todoIndex],
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while editing the todo',
        });
    }
}

export function deleteTodo(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const todoIndex = todos.findIndex((todo: any) => todo.id === +id);

        todos.splice(todoIndex, 1);

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while deleting the todo',
        });
    }
}
