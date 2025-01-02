import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from '../utils/handleResponse';
import { User } from "../models/users.models";

export async function getUser(req: Request, res: Response) {
    try {
        const { id } = req.params
        const todo = await User.findById(id)

        if (!todo) {
            sendErrorResponse(res, { statusCode: 404, message: 'User not found' })
        } else {
            sendSuccessResponse(res, { data: todo })
        }
    } catch (error) {
        console.error(error);

        sendErrorResponse(res, {})
    }
}

export async function editUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!user) {
            sendErrorResponse(res, { statusCode: 404, message: 'user not found' })
        } else {
            sendSuccessResponse(res, { data: user })
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        sendErrorResponse(res, { message: 'Failed to fetch users' })
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            sendErrorResponse(res, { statusCode: 404, message: 'user not found' })
        } else {
            sendSuccessResponse(res, { message: 'user deleted', data: null })
        }
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, {})
    }
}
