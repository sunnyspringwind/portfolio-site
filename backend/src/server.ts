import express, {Request, Response} from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import {appConfig} from './config/app';

// default export import
import messageRoutes from './routes/message.routes';

// create the app express framework
const app = express()


// configs .env projectwide
dotenv.config();

// database connection [mongoose]
mongoose.connect('mongodb://127.0.0.1:27017/mydb').then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// cors policy first
app.use(cors({origin: 'http://localhost:5173'}))

// middleware [parse json]
app.use(express.json());

// middlewares [modular route]
app.use('/api/message', messageRoutes)

// listen
app.listen(appConfig.port, ()=>{
    console.log(appConfig)
    console.log(`Server is running at http://localhost:${appConfig.port}`);
})