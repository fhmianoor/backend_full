import express from "express";
import { sendPasswordResetOtpEmail, resetUserPassword } from "./controller.js";
const router = express.Router();

router.post("/", async (req, res) => {
    try{
        const {email} = req.body;
        if(!email) return res.status(400).json({message: "Email is required"});

        const createPasswordResetOtp = await sendPasswordResetOtpEmail(email);
        res.status(200).json({message: "OTP sent to email", otp: createPasswordResetOtp});

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});

    }
})

router.post("/reset", async (req, res) => {
    try{
        const {email, otp, newPassword} = req.body;
        if(!email || !otp || !newPassword) return res.status(400).json({message: "All fields are required"});

        await resetUserPassword(email, otp, newPassword);
        res.status(200).json({message: "Password reset successful"});



        

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
})

export default router;

