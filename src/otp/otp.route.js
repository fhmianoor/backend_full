import express from "express";
import { sendOtp, verifyOtp } from "./otp.controller.js";
const router = express.Router();

// Middleware untuk validasi input (bisa menggunakan express-validator untuk lebih kompleks)
const validateRequest = (req, res, next) => {
    const { email, subject, message, duration } = req.body;
    if (!email || !subject || !message) {
        return res.status(400).json({ message: "Email, subject, and message are required" });
    }
    next();
};

// Route untuk generate OTP
router.post("/", validateRequest, async (req, res) => {
    try {
        const { email, subject, message, duration } = req.body;
        await sendOtp(email, subject, message, duration);
        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Route untuk verifikasi OTP
router.post("/verify", async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }
        const result = await verifyOtp(email, otp);
        return res.status(200).json({ message: "OTP verified successfully", result });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

export default router;
