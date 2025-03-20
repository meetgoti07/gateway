import {EscrowAccount} from "../models/escrowModel.js";
import Merchant from "../models/merchantModel.js";
import {Refund} from "../models/refundSchema.js";
import {Settlement} from "../models/settlementSchema.js";
import {Transaction} from "../models/transactionModel.js";

// Fetch Escrow List
const getEscrowList = async (req, res) => {
    try {
        const escrowList = await EscrowAccount.find()
            .populate("merchant_id")  // Populate merchant details if needed
            .populate("transaction_id"); // Populate transaction details if needed
        res.status(200).json(escrowList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching escrow list" });
    }
};

// Fetch Merchant List
const getMerchantList = async (req, res) => {
    try {
        const merchantList = await Merchant.find();
        res.status(200).json(merchantList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching merchant list" });
    }
};

// Fetch Refund List
const getRefundList = async (req, res) => {
    try {
        const refundList = await Refund.find()
            .populate("transaction_id"); // Populate transaction details if needed
        res.status(200).json(refundList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching refund list" });
    }
};

// Fetch Settlement List
const getSettlementList = async (req, res) => {
    try {
        const settlementList = await Settlement.find()
            .populate("escrow_account_id")  // Populate escrow details if needed
        res.status(200).json(settlementList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching settlement list" });
    }
};

// Fetch Transaction List
const getTransactionList = async (req, res) => {
    try {
        const transactionList = await Transaction.find()
            .populate("merchant_id")  // Populate merchant details if needed
            .populate("transaction_id"); // Populate related transaction details if needed
        res.status(200).json(transactionList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching transaction list" });
    }
};

export {
    getEscrowList,
    getMerchantList,
    getRefundList,
    getSettlementList,
    getTransactionList
};
