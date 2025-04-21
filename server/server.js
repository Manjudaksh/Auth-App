import express from 'express';
import cors from 'cors';    
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js'; 
import authRouter from './router/auth.Routes.js';
import userRouter from './router/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000
connectDB(); 

const allowedOrigins = ['http://localhost:5173'] // React app URL

app.use(express.json());
app.use(cors({origin:allowedOrigins, credentials: true}));
app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/auth', authRouter); //
app.use('/api/user', userRouter); 

app.listen(port, () => console.log(`Server is running on port ${port}`));


// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import connectDB from './config/mongodb.js';
// import authRouter from './router/auth.Routes.js';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 4000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // frontend origin
// app.use(cookieParser());
// app.use(express.json());

// // Catch JSON parsing errors
// app.use((err, req, res, next) => {
//   if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//     return res.status(400).json({ success: false, message: "Invalid JSON" });
//   }
//   next();
// });

// // Routes
// app.get('/', (req, res) => res.send('Hello World!'));
// app.use('/api/auth', authRouter);

// // Start server
// app.listen(port, () => console.log(`Server is running on port ${port}`));