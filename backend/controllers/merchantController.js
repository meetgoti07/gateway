import Auth from '../models/authModel.js';
import Merchant from '../models/merchantModel.js';
import {json} from "express";
import {MerchantAPIKey} from "../models/merchantAPIKey.js";
import crypto from "crypto";
import {Refund} from "../models/refundSchema.js";
import {Settlement} from "../models/settlementSchema.js";
import {Transaction} from "../models/transactionModel.js";
import {EscrowAccount} from "../models/escrowModel.js";


// Update Merchant Details (After Registration)
const registerMerchant = async (req, res) => {
    try {
        const {
            legal_name,
            business_name,
            gst_no,
            pan_no,
            url,
            dob,
            business_category,
            msme_udyam_no,
            ownership_type,
            bank_acc_no,
            ifsc_code,
            address_line_1,
            address_line_2,
            city,
            district,
            state,
            pincode,
            aadhar_no,
            gender
        } = req.body;

        // Step 1: Find the Merchant by email (email is unique)
        const merchant = await Merchant.findOne({ email: req.body.email });
        if (!merchant) {

            return res.status(404).json({ message: 'Merchant not found' });
        }

        // Step 2: Update the remaining details
        merchant.legal_name = legal_name || merchant.legal_name;
        merchant.business_name = business_name || merchant.business_name;
        merchant.gst_no = gst_no || merchant.gst_no;
        merchant.pan_no = pan_no || merchant.pan_no;
        merchant.url = url || merchant.url;
        merchant.dob = dob || merchant.dob;
        merchant.business_category = business_category || merchant.business_category;
        merchant.msme_udyam_no = msme_udyam_no || merchant.msme_udyam_no;
        merchant.ownership_type = ownership_type || merchant.ownership_type;
        merchant.bank_acc_no = bank_acc_no || merchant.bank_acc_no;
        merchant.ifsc_code = ifsc_code || merchant.ifsc_code;
        merchant.address_line_1 = address_line_1 || merchant.address_line_1;
        merchant.address_line_2 = address_line_2 || merchant.address_line_2;
        merchant.city = city || merchant.city;
        merchant.district = district || merchant.district;
        merchant.state = state || merchant.state;
        merchant.pincode = pincode || merchant.pincode;
        merchant.aadhar_no = aadhar_no || merchant.aadhar_no;
        merchant.gender = gender || merchant.gender;

        // Step 3: Save the updated Merchant document
        await merchant.save();

        res.status(200).json({ message: 'Merchant details updated successfully', merchant });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during merchant details update' });
    }
};


// Get Merchant by Email (GET)
const getMerchantByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        // Fetch merchant from database
        const merchant = await Merchant.findOne({ email:email });

        if (!merchant) {
            return res.status(404).json({ message: 'Merchant not found' });
        }

        res.status(200).json({ merchant });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getMeMerchant = async (req, res) => {

    try {

        const userId = req.user; // Assuming the decoded token contains the user id

        // Fetch the merchant based on the user ID from the token
        const merchant = await Merchant.findOne({ auth: userId });

        if (!merchant) {
            return res.status(404).json({ message: 'Merchant not found' });
        }

        res.status(200).json({ merchant });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getApiKeyForMerchant = async (req, res) => {
    try {
        const merchantId = req.user; // Extracted from the JWT token via middleware

        // Find the merchant's API key entry
        const apiKeyEntry = await MerchantAPIKey.findOne({ merchant_id: merchantId });

        if (!apiKeyEntry) {
            return res.status(404).json({ message: "API key not found. Please contact support." });
        }

        // Generate a new API key
        const newApiKey = crypto.randomBytes(32).toString("hex"); // Generate 64-character key
        const hashedApiKey = crypto.createHash("sha256").update(newApiKey).digest("hex");

        // Update the API key in the database
        apiKeyEntry.api_key = hashedApiKey;
        await apiKeyEntry.save();

        // Return the new API key (merchant must store it securely)
        res.status(200).json({
            message: "New API key generated successfully. Store it securely.",
            api_key: newApiKey
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching API key" });
    }
};


// Delete Merchant by Email (DELETE)
const deleteMerchant = async (req, res) => {
    try {
        const { email } = req.params;

        // Find and delete merchant
        const merchant = await Merchant.findOneAndDelete({ email });

        if (!merchant) {
            return res.status(404).json({ message: 'Merchant not found' });
        }

        // Delete the associated Auth document
        await Auth.findByIdAndDelete(merchant.auth);

        res.status(200).json({ message: 'Merchant deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Fetch Escrow List
const getMerchantEscrowList = async (req, res) => {
    try {
        const merchantId = req.user; // Extract merchant ID from req.user
        console.log(merchantId);
        const escrowList = await EscrowAccount.find({ merchant_id: merchantId })
            .populate("merchant_id")  // Populate merchant details if needed
            .populate("transaction_id"); // Populate transaction details if needed
        res.status(200).json(escrowList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching escrow list" });
    }
};

// Fetch Refund List
const getMerchantRefundList = async (req, res) => {
    try {
        const merchantId = req.user; // Extract merchant ID from req.user
        const refundList = await Refund.find({ merchant_id: merchantId })
            .populate("transaction_id"); // Populate transaction details if needed
        res.status(200).json(refundList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching refund list" });
    }
};

// Fetch Settlement List
const getMerchantSettlementList = async (req, res) => {
    try {
        const merchantId = req.user; // Extract merchant ID from req.user
        const settlementList = await Settlement.find({ merchant_id: merchantId })
            .populate("escrow_account_id")  // Populate escrow details if needed
            .populate("merchant_id"); // Populate merchant details if needed
        res.status(200).json(settlementList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching settlement list" });
    }
};

// Fetch Transaction List
const getMerchantTransactionList = async (req, res) => {
    try {
        const merchantId = req.user; // Extract merchant ID from req.user
        const transactionList = await Transaction.find({ merchant_id: merchantId })
        res.status(200).json(transactionList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching transaction list" });
    }
};

export {
    getMerchantEscrowList,
    getMerchantRefundList,
    getMerchantSettlementList,
    getMerchantTransactionList,
    registerMerchant,
    getMerchantByEmail,
    deleteMerchant,
    getMeMerchant,
    getApiKeyForMerchant

};
