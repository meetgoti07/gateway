import mongoose, { Schema } from 'mongoose';

const merchantSchema = new Schema(
    {
        legal_name: {
            type: String
        },
        business_name: {
            type: String
        },
        email: {
            type: String,
            unique: true,
        },
        gst_no: {
            type: String,
        },
        pan_no: {
            type: String,
        },
        url: {
            type: String,
        },
        dob: {
            type: Date,
        },
        business_category: {
            type: String,
        },
        msme_udyam_no: {
            type: String,
        },
        ownership_type: {
            type: String,
        },
        bank_acc_no: {
            type: String,
        },
        ifsc_code: {
            type: String,
        },
        address_line_1: {
            type: String,
        },
        address_line_2: {
            type: String,
        },
        city: {
            type: String,
        },
        district: {
            type: String,
        },
        state: {
            type: String,
        },
        pincode: {
            type: String,
        },
        aadhar_no: {
            type: String,
        },
        gender: {
            type: String,
        },
        auth: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Auth', // Link to Auth model
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Merchant = mongoose.model('Merchant', merchantSchema);

export default Merchant;
