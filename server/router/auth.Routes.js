import express from 'express';
import {  logout, login, register, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword } from '../controller/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.post('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-Reset-Otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);

export default authRouter;