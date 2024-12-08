import express from "express";
import { sendOtp } from "./otp.controller.js";
const router = express.Router();

// Route untuk generate OTP
router.post("/generate", async (req, res) => {
    try {
        const { email, subject, message, duration } = req.body;
        const otp = await sendOtp(email, subject, message, duration);
        return res.status(200).json({ message: "OTP sent successfully", otp });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
