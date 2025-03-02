import express from 'express';
import {merchantRegister, merchantLogin, adminLogin, refreshToken } from '../controllers/authController.js';

const router = express.Router();

// Merchant Login Route
router.post('/merchant/login', merchantLogin);

//Register
router.post('/merchant/register', merchantRegister);

// Admin Login Route
router.post('/admin/login', adminLogin);

// Token Refresh Route
router.post('/refresh-token', refreshToken);

export default router;
