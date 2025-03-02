import jwt from 'jsonwebtoken';
import Auth from '../models/authModel.js';

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        } else {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
};

// Verify Merchant Access (Role-based)
export const verifyMerchant = async (req, res, next) => {
    const userId = req.user.userId;
    try {
        const user = await Auth.findById(userId);
        if (!user || user.role !== 'merchant') {
            return res.status(403).json({ message: 'Access denied, merchant only' });
        }
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};

// Verify Admin Access (Role-based)
export const verifyAdmin = async (req, res, next) => {
    const userId = req.user;
    try {
        const user = await Auth.findById(userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied, admin only' });
        }
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};
