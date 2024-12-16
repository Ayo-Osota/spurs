"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const dbURI = process.env.MONGODB_URI
// export const connectDb = async () => {
//     try {
//         const connection = await mongoose.connect(dbURI);
//         console.log("Database is connected", connection);
//     } catch (err) {
//         console.log(err);
//     }
// };
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
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
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        if (cached.conn) {
            return cached.conn;
        }
        if (!cached.promise) {
            const opts = {
                bufferCommands: false,
            };
            console.log('DB connected here');
            cached.promise = mongoose_1.default.connect(MONGODB_URI, opts).then((mongoose) => {
                return mongoose;
            });
        }
        cached.conn = yield cached.promise;
        return cached.conn;
    });
}
exports.default = connectDb;
