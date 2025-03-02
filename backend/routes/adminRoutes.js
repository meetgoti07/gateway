import express from "express";
import {
    getEscrowList,
    getMerchantList,
    getRefundList,
    getSettlementList,
    getTransactionList
} from "../controllers/adminController.js";
import {verifyAdmin, verifyToken} from "../middleware/authMiddleware.js";

const router = express.Router();

// Fetch Escrow List
router.get("/escrow-list",verifyToken, verifyAdmin, getEscrowList);

// Fetch Merchant List
router.get("/merchant-list",verifyToken, verifyAdmin, getMerchantList);

// Fetch Refund List
router.get("/refund-list",verifyToken, verifyAdmin, getRefundList);

// Fetch Settlement List
router.get("/settlement-list",verifyToken, verifyAdmin, getSettlementList);

// Fetch Transaction List
router.get("/transaction-list",verifyToken, verifyAdmin, getTransactionList);

export default router;
