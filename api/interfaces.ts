import { Document } from "mongoose";

export interface CreateTodoInputI {
    title: string;
    dueDate: Date;
    reminderDate: Date;
    repeat: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'WEEKDAYS' | string;
}

export interface TodoI extends CreateTodoInputI, Document {
    userId: string;
    important: boolean;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}
