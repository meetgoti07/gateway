import express from 'express';
import {confirmPayment, getTransactionDetails, initiatePayment} from "../controllers/transactionController.js";
import {verifyAPIKey} from "../middleware/verifyAPIKey.js";

const router = express.Router();

router.post("/initiate-payment", verifyAPIKey, initiatePayment);
router.get("/transaction/:transaction_id", getTransactionDetails);
router.post("/confirm-payment", confirmPayment);

export default router;