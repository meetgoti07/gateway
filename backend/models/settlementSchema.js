import mongoose from 'mongoose';

// Settlement Schema
const settlementSchema = new mongoose.Schema({
    escrow_account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EscrowAccount', required: true }, // Reference to the escrow account
    merchant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', required: true }, // Merchant receiving the funds
    amount_settled: { type: Number, required: true }, // Amount settled to the merchant
    settlement_status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }, // Status of the settlement
    payment_method: { type: String, required: true }, // Payment method used for the settlement (e.g., bank transfer)
    settlement_date: { type: Date, required: true }, // Date when the settlement is processed
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const Settlement = mongoose.model('Settlement', settlementSchema);
