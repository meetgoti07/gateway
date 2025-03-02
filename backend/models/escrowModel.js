import mongoose from 'mongoose';

// Escrow Account Schema
const escrowSchema = new mongoose.Schema({
    merchant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', required: true }, // Link to the merchant
    transaction_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true }, // Associated transaction
    amount: { type: Number, required: true }, // Amount in escrow
    status: {
        type: String,
        enum: ['pending', 'released', 'failed'],
        default: 'pending'
    }, // Escrow status: pending, released, or failed
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const EscrowAccount = mongoose.model('EscrowAccount', escrowSchema);
