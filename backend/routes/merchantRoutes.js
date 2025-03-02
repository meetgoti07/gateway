import express from 'express';
import {
    registerMerchant,
    getMerchantByEmail,
    deleteMerchant,
    getMeMerchant,
    getApiKeyForMerchant
} from '../controllers/merchantController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register Merchant (POST)
// This route allows merchants to register their details after initial registration
router.post('/register', verifyToken, registerMerchant);

// Get Merchant by Email (GET)
router.get('/:email', verifyToken, getMerchantByEmail);
router.post('/me', verifyToken, getMeMerchant);
router.get('/apikey/me', verifyToken, getApiKeyForMerchant);

// Delete Merchant by Email (DELETE)
router.delete('/:email', verifyToken, deleteMerchant);


export default router;
