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
const express_1 = __importDefault(require("express"));
const todos_routes_1 = __importDefault(require("./routes/todos.routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// app.use((req, res, next) => {
//     next()
// })
// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to Spurs Todo API!');
});
app.get('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(process.env.MONGODB_URI);
        const connection = yield mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log({ connection });
        yield mongoose_1.default.connection.db.admin().ping();
        res.status(200).send('Database is connected');
    }
    catch (err) {
        console.log(process.env.MONGODB_URI);
        res.status(500).send('Database connection failed');
    }
}));
app.use('/api/v1/todos', todos_routes_1.default);
exports.default = app;
