import express from "express";
import { verifyEmail } from "./email.controller.js";

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

export default router;
