import mongoose from "mongoose";

const schema = mongoose.Schema;

const otpSchema = new schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
