import fs from 'fs';
import { Request, Response } from "express";

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

export function getAllTodos(req: Request, res: Response) {
    res.status(200).json({
        status: 'success',
        results: todos.length,
        data: {
            todos: todos
        }
    })
}

export function createTodo(req: Request, res: Response) {
    const newId = todos[todos.length - 1].id + 1;
    const newTodo = Object.assign({ id: newId }, req.body);

    todos.push(newTodo)

    fs.writeFile(data, JSON.stringify(todos), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTodo
            }
        })
    })
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
            updatedAt: new Date().toISOString(), // Add/update an `updatedAt` field
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
