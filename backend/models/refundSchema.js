import mongoose from 'mongoose';

// Refund Schema
const refundSchema = new mongoose.Schema({
    transaction_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true }, // Original transaction
    amount: { type: Number, required: true }, // Amount refunded
    refund_status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }, // Status of the refund
    refund_date: { type: Date, default: Date.now }, // When the refund is processed
    reason: { type: String }, // Reason for the refund (optional)
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const Refund = mongoose.model('Refund', refundSchema);
