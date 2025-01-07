"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    users: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.Todo = (0, mongoose_1.model)('Todo', todoSchema);
