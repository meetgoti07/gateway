import express from 'express';
import {
    registerMerchant,
    getMerchantByEmail,
    deleteMerchant,
    getMeMerchant,
    getApiKeyForMerchant,
    getMerchantEscrowList,
    getMerchantRefundList,
    getMerchantSettlementList,
    getMerchantTransactionList
} from '../controllers/merchantController.js';
import { verifyMerchant, verifyToken} from '../middleware/authMiddleware.js';


const router = express.Router();

// Register Merchant (POST)
// This route allows merchants to register their details after initial registration
router.post('/register', verifyToken, registerMerchant);
//
// // Get Merchant by Email (GET)

router.post('/me', verifyToken, getMeMerchant);
router.get('/apikey/me', verifyToken, getApiKeyForMerchant);
;
//

router.get("/escrow-list",verifyToken, verifyMerchant, getMerchantEscrowList);
// Fetch Refund List
router.get("/refund-list",verifyToken, verifyMerchant, getMerchantRefundList);
// Fetch Settlement List
router.get("/settlement-list",verifyToken, verifyMerchant, getMerchantSettlementList);
// Fetch Transaction List
router.get("/transaction-list", verifyToken, verifyMerchant, getMerchantTransactionList);

router.delete('/:email', verifyToken, deleteMerchant);
router.get('/:email', verifyToken, getMerchantByEmail);

export default router;
