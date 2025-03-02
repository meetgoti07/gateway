import {Transaction} from "../models/transactionModel.js";
import Merchant from "../models/merchantModel.js";

/**
 * Verify UPI ID
 * @route POST /api/verify-upi
 * @access Public
 */
const verifyUpi = async (req, res) => {
    try {
        const { upiId } = req.body;

        // Assuming UpiService verifies the UPI ID
        const isValid = await UpiService.verifyUpiId(upiId);

        if (isValid) {
            res.status(200).json({ message: "UPI ID verified successfully", success: true });
        } else {
            res.status(400).json({ message: "Invalid UPI ID", success: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error verifying UPI ID", success: false });
    }
};

/**
 * Handle Bank Transaction (POST)
 * @route POST /api/make-transaction
 * @access Private
 */
const makeBankTransaction = async (req, res) => {
    try {
        const { transactionId, upiId, amount } = req.body;

        // Call BankService to initiate the transaction
        const transactionResponse = await BankService.processTransaction(upiId, amount);

        if (transactionResponse.success) {
            // Save the transaction status in DB
            const transaction = await Transaction.findById(transactionId);
            transaction.status = "processing";
            await transaction.save();

            // Respond with the transaction status and redirection URL
            res.status(200).json({
                message: "Transaction processing started",
                success: true,
                redirect_url: `/payment/complete/${transactionId}`,
            });
        } else {
            res.status(400).json({ message: "Bank transaction failed", success: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error processing transaction", success: false });
    }
};


/**
 * Update transaction status (success/failure) and notify frontend
 * @route POST /api/transaction/status
 * @access Private
 */
const updateTransactionStatus = async (req, res) => {
    try {
        const { transactionId, status } = req.body;

        // Find transaction by ID
        const transaction = await Transaction.findOne({ transaction_id: transactionId });
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        // Update status based on bank response
        transaction.status = status;
        await transaction.save();

        // Fetch merchant domain to generate complete URL
        const merchant = await Merchant.findById(transaction.merchant_id);
        const redirectUrl = status === "success"
            ? `${merchant.domain}${transaction.success_url}`
            : `${merchant.domain}${transaction.error_url}`;

        // Send back redirect URL and success/failure message
        res.status(200).json({ redirect_url: redirectUrl, success: status === "success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating transaction status" });
    }
};


export {makeBankTransaction, verifyUpi, updateTransactionStatus };



