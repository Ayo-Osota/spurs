// import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();


// const dbURI = process.env.MONGODB_URI

// export const connectDb = async () => {
//     try {
//         const connection = await mongoose.connect(dbURI);

//         console.log("Database is connected", connection);
//     } catch (err) {
//         console.log(err);
//     }
// };


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env"
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDb() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDb;