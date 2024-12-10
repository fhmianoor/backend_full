import express from "express";
import { verifyEmail, verifyEmailOtp } from "./email.controller.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new Error("Email is required");
        }

        const createdOtp = await verifyEmail(email);
        return res.status(200).json({ message: "Email verified successfully", createdOtp });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/verify", async (req, res) => {
    try {
        let { email, otp } = req.body;

        if(!email || !otp){
            throw error("Email and OTP are required");
        }

        await verifyEmailOtp(email, otp);
        return res.status(200).json({ message: "Email verified successfully" });
    
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
