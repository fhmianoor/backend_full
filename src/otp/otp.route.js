import express from "express";
import { sendOtp, verifyOtp } from "./otp.controller.js";
const router = express.Router();

// Route untuk generate OTP
router.post("/", async (req, res) => {
    try {
        const { email, subject, message, duration } = req.body;
        const otp = await sendOtp(email, subject, message, duration);
        return res.status(200).json({ message: "OTP sent successfully", otp });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/verify", async (req, res) => {
    try {
        let { email, otp } = req.body;
        const result = await verifyOtp(email, otp);
        return res.status(200).json({ message: "OTP verified successfully", result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
