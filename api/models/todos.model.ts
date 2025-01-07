import { model, Schema } from 'mongoose'
import { TodoI } from '../interfaces'

const todoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
        users: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        contributors: {
            type: Array,
            required: false,
        },
        dueDate: {
            type: Date,
            required: false,
        },
        reminderDate: {
            type: Date,
            required: false,
        },
        repeat: {
            type: String,
            enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'WEEKDAYS', 'NEVER'],
            required: false,
        },
        important: {
            type: Boolean,
            default: false,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

export const Todo = model<TodoI>('Todo', todoSchema)
