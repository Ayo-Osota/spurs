import { Request, Response } from 'express'
import { Todo } from '../models/todos.model'
import { sendErrorResponse, sendSuccessResponse } from '../utils/handleResponse'

export async function getAllTodos(req: Request, res: Response) {
    try {
        const todos = await Todo
            .find
            // { users: req.user.userId }
            ()

        sendSuccessResponse(res, { data: todos })
    } catch (error) {
        console.error(error)
        sendErrorResponse(res, {})
    }
}

export async function createTodo(req: Request, res: Response) {
    try {
        const { title, dueDate, reminderDate, repeat } = req.body

        const newTodo = await new Todo({
            title,
            dueDate,
            reminderDate,
            repeat,
            // createdBy: req.user.userId,
            // users: [req.user.userId],
        }).save()

        sendSuccessResponse(res, { data: newTodo })
    } catch (error) {
        console.error(error)
        sendErrorResponse(res, {})
    }
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
