import bcrypt from 'bcryptjs';
import Auth from '../models/authModel.js'; // Merchant and Admin Auth model
import { generateAccessToken, generateRefreshToken } from '../config/jwt.js';
import Merchant from "../models/merchantModel.js";
import crypto from "crypto";
import {MerchantAPIKey} from "../models/merchantAPIKey.js";


// Merchant Login
export const merchantLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const merchant = await Auth.findOne({ email, role: 'merchant' }); // Check if it's a merchant
        if (!merchant) {
            return res.status(400).json({ message: 'Merchant not found' });
        }
        // Verify password
        const isMatch = await bcrypt.compare(password, merchant.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT tokens
        const accessToken = generateAccessToken(merchant._id.toString());
        const refreshToken = generateRefreshToken(merchant._id.toString());

        // Save refresh token in the database
        merchant.refreshToken = refreshToken;
        await merchant.save();

        res.status(200).json({
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const merchantRegister = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if merchant email already exists
        const existingMerchant = await Auth.findOne({ email, role: "merchant" });
        if (existingMerchant) {
            return res.status(400).json({ message: "Merchant with this email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create an Auth entry
        const newAuth = new Auth({
            email,
            password: hashedPassword,
            role: "merchant",
        });

        await newAuth.save();

        // Create Merchant entry
        const newMerchant = new Merchant({
            email,
            auth: newAuth._id,
        });

        await newMerchant.save();

        // Generate a secure API key
        const rawApiKey = crypto.randomBytes(32).toString("hex"); // 64-character key
        const hashedApiKey = crypto.createHash("sha256").update(rawApiKey).digest("hex"); // Secure hashing

        // Save API key to the database
        const newApiKey = new MerchantAPIKey({
            merchant_id: newAuth._id,
            api_key: hashedApiKey, // Store only hashed API key
        });

        await newApiKey.save();

        // Return the raw API key to the merchant (They must store it safely)
        res.status(201).json({
            message: "Merchant registered successfully. Store this API key securely.",
            api_key: rawApiKey, // Only return the raw key once
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during registration" });
    }
};



// Admin Login
export const adminLogin = async (req , res) => {
    const { email, password } = req.body;

    try {
        const admin = await Auth.findOne({ email, role: 'admin' }); // Check if it's an admin
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT tokens
        const accessToken = generateAccessToken(admin._id.toString());
        const refreshToken = generateRefreshToken(admin._id.toString());

        // Save refresh token in the database
        admin.refreshToken = refreshToken;
        await admin.save();

        res.status(200).json({
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Token Refresh
export const refreshToken = async (req , res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        const merchantOrAdmin = await Auth.findOne({ refreshToken });
        if (!merchantOrAdmin) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Verify refresh token
        const newAccessToken = generateAccessToken(merchantOrAdmin._id.toString());
        const newRefreshToken = generateRefreshToken(merchantOrAdmin._id.toString());

        // Save new refresh token
        merchantOrAdmin.refreshToken = newRefreshToken;
        await merchantOrAdmin.save();

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
