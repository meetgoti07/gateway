import mongoose from "mongoose";

const ApiKeySchema = new mongoose.Schema({
    merchant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
    api_key: { type: String, required: true, unique: true }, // Hashed API Key
    created_at: { type: Date, default: Date.now },
});

export const MerchantAPIKey = mongoose.model("ApiKey", ApiKeySchema);
