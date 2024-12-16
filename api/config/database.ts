import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const dbURI = process.env.MONGODB_URI

export const connectDb = async () => {
    try {
        const connection = await mongoose.connect(dbURI);

        console.log("Database is connected", connection);
    } catch (err) {
        console.log(err);
    }
};