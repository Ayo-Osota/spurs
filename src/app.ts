import express from 'express';
import todosRouter from './routes/todos.routes';
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

app.use('/api/v1/todos', todosRouter);

export default app