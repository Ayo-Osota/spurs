import express from 'express'
import todosRouter from './routes/todos.routes'
import mongoose from 'mongoose'
import connectDb from './config/database'
import usersRouter from './routes/users.routes'
const app = express()

// Middleware
app.use(express.json())

app.use('/api', async (req, res, next) => {
    try {
        await connectDb()
        next()
    } catch (error) {
        console.error('Database connection error:', error)
        res.status(500).json({
            status: 'fail',
            message: 'Database connection failed',
        })
    }
})

// app.use((req, res, next) => {
//     next()
// })

// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to Spurs Todo API!')
})

app.get('/health', async (req, res) => {
    try {
        console.log(process.env.MONGODB_URI)
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log({ connection })

        await mongoose.connection.db.admin().ping()
        res.status(200).send('Database is connected')
    } catch (err) {
        console.log(process.env.MONGODB_URI)
        res.status(500).send('Database connection failed')
    }
})

app.use('/api/v1/todos', todosRouter)
app.use('/api/v1/users', usersRouter)

export default app
