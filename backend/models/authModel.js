import mongoose, { Schema } from 'mongoose';


const authSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        refreshToken: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            required: true,
            enum: ['merchant', 'admin'], // Enum for role validation
        },
    },
    {
        timestamps: true,
    }
);

const Auth = mongoose.model('Auth', authSchema);

export default Auth;
