import crypto from "crypto";
import {MerchantAPIKey} from "../models/merchantAPIKey.js";

export const verifyAPIKey = async (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
        return res.status(401).json({ error: "API key required" });
    }

    const hashedInputKey = crypto.createHash("sha256").update(apiKey).digest("hex");

    const keyRecord = await MerchantAPIKey.findOne({ api_key: hashedInputKey });

    if (!keyRecord) {
        return res.status(403).json({ error: "Invalid API key" });
    }

    req.merchant_id = keyRecord.merchant_id;
    next();
};
