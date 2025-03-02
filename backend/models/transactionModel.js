import mongoose, {Schema} from "mongoose";

const TransactionSchema = new Schema({
    transaction_id: { type: String, unique: true },
    merchant_id: { type: Schema.Types.ObjectId, ref: "Merchant", required: true },
    order_id: { type: String, required: true },
    amount: { type: Number, required: true },
    customer_name: { type: String },
    customer_email: { type: String },
    customer_mobile: { type: String },
    success_url: { type: String, required: true },
    error_url: { type: String, required: true },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    created_at: { type: Date, default: Date.now },
    expires_at: { type: Date, required: true }
});

export const Transaction = mongoose.model("Transaction", TransactionSchema);
