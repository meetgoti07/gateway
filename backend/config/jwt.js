import jwt from 'jsonwebtoken';

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET , {
        expiresIn: '15m', // Access token expires in 15 minutes
    });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d', // Refresh token expires in 7 days
    });
};

const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        return null;
    }
};

const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return decoded;
    } catch (err) {
        return null;
    }
};

export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };
