"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: false
    },
    reminderDate: {
        type: Date,
        required: false
    },
    repeat: {
        type: String,
        enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY',
            'WEEKDAYS', 'NEVER'],
        required: false
    },
    important: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
exports.Todo = (0, mongoose_1.model)("Todo", todoSchema);
