import 'reflect-metadata';
import express from 'express';
import "express-async-errors";
import { router } from './routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

// createConnection();
const app = express();

app.use(express.json());
app.use(router);

dotenv.config()
const connectionString = process.env.DB_CONNECTION

mongoose.connect(connectionString, {
    useNewUrlParser: true, useUnifiedTopology: true
}, () => {
    console.log('Connected to MongoDB!')
}
)

// app.use(
//     (err: Error, request: Request, response: Response, _next: NextFunction) => {
//         if (err instanceof AppError) {
//             return response.status(err.statusCode).json({
//                 message: err.message
//             });
//         }
//         else {
//             return response.status(500).json({
//                 status: "Error",
//                 message: `Internal Server Error ${err.message}`
//             });
//         }
//     }
// )

export { app };