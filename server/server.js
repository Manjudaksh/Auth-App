import express from 'express';
import cors from 'cors';    
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js'; 
import authRouter from './router/auth.Routes.js';
import userRouter from './router/userRoutes.js';

const app = express();
const port = 4000
connectDB(); 

const allowedOrigins = ['https://auth-app-2ca3.onrender.com'] // React app URL

app.use(express.json());
app.use(cors({origin:allowedOrigins, credentials: true}));
app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/auth', authRouter); //
app.use('/api/user', userRouter); 

app.listen(port, () => console.log(`Server is running on port ${port}`));

