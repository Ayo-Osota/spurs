import { Document } from "mongoose";

export interface CreateTodoInputI {
    title: string;
    dueDate: Date;
    reminderDate: Date;
    repeat: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'WEEKDAYS' | string;
}

export interface TodoI extends CreateTodoInputI, Document {
    createdBy: string;
    contributors: string[]
    important: boolean;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}