import 'reflect-metadata';
import express from 'express';
import "express-async-errors";
import { router } from './routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


const app = express();
const cors = require("cors");

app.use(express.json());
app.use(router);
app.use(cors());
app.use(express.static('build'));

dotenv.config();
const connectionString = process.env.DB_CONNECTION;

mongoose.connect(connectionString, {
    useNewUrlParser: true, useUnifiedTopology: true
}, () => {
    console.log('Connected to MongoDB!')
}
)

export { app };
