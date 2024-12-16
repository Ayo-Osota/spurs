import express from 'express';
import todosRouter from './routes/todos.routes';
import mongoose from 'mongoose';
const app = express();

// Middleware
app.use(express.json());

// app.use((req, res, next) => {
//     next()
// })

// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to Spurs Todo API!');
});

app.get('/health', async (req, res) => {
    try {
        console.log(process.env.MONGODB_URI);
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log({ connection });

        await mongoose.connection.db.admin().ping();
        res.status(200).send('Database is connected');

    } catch (err) {
        console.log(process.env.MONGODB_URI);
        res.status(500).send('Database connection failed');
    }
});

app.use('/api/v1/todos', todosRouter);

export default app