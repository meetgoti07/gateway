import {Transaction} from "../models/transactionModel.js";
import { v4 as uuidv4 } from 'uuid';
import Merchant from "../models/merchantModel.js";

// Initiate Payment
const initiatePayment = async (req, res) => {
    try {
        const { order_id, amount, success_url, error_url, customer_name, customer_email, customer_mobile } = req.body;

        if (!order_id || !amount || !success_url || !error_url) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const transaction_id = uuidv4();
        const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        const newTransaction = new Transaction({
            transaction_id,
            merchant_id: req.merchant_id,
            order_id,
            amount,
            customer_name,
            customer_email,
            customer_mobile,
            success_url,
            error_url,
            expires_at
        });

        await newTransaction.save();

        return res.json({
            payment_url: `${process.env.BASE_URL}/secure/payment/${transaction_id}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during payment initiation" });
    }
};

// Get Transaction Details
const getTransactionDetails = async (req, res) => {
    try {
        const { transaction_id } = req.params;
        const transaction = await Transaction.findOne({ transaction_id });

        if (!transaction || transaction.expires_at < new Date()) {
            return res.status(404).json({ error: "Transaction expired or not found" });
        }

        return res.json({
            transaction_id: transaction.transaction_id,
            order_id: transaction.order_id,
            amount: transaction.amount,
            status: transaction.status
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during transaction details retrieval" });
    }
};

// Confirm Payment
const confirmPayment = async (req, res) => {
    try {
        const { transaction_id, status } = req.body;

        // Find the transaction
        const transaction = await Transaction.findOne({ transaction_id });

        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        // Find the merchant's registered domain
        const merchant = await Merchant.findById(transaction.merchant_id);

        if (!merchant || !merchant.domain) {
            return res.status(404).json({ error: "Merchant domain not found" });
        }

        // Construct full success & failure URLs
        const successUrl = `${merchant.domain}${transaction.success_url}`;
        const failureUrl = `${merchant.domain}${transaction.error_url}`;

        // Update transaction status
        transaction.status = status;
        await transaction.save();

        // Redirect based on payment status
        if (status === "success") {
            return res.json({ redirect_url: successUrl });
        } else {
            return res.json({ redirect_url: failureUrl });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during payment confirmation" });
    }
};

export { initiatePayment, getTransactionDetails, confirmPayment };