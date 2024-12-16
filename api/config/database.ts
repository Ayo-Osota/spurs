import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const dbURI = process.env.DB_URI.replace('<PASSWORD>', process.env.DB_PASSWORD);

export const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log("Database is connected", connection);
    } catch (err) {
        console.log(err);
    }
};