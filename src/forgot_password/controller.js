import User from "../models/user.js";
import {sendOtp, verifyOtp, deleteOtp} from "../otp/otp.controller.js";
import {hashData} from "../util/hashData.js";

export const sendPasswordResetOtpEmail = async (email) => {
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(400).json({message: "User not found"});

        if(!existingUser.verify) return res.status(400).json({message: "email has not been verified, check your email for verification"});

        const otpDetails = {
            email,
            subject: "Password Reset OTP",
            message: `Enter the OTP to reset your password`,
            duration: 2
        }

        const createdOtp = await sendOtp(otpDetails.email, otpDetails.subject, otpDetails.message, otpDetails.duration);
        return createdOtp;

    }catch(error){
        console.log(error);
        throw error;
    }
}

export const resetUserPassword = async (email, otp, newPassword) => {
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(400).json({message: "User not found"});

        const isOtpValid = await verifyOtp(otp, existingUser.email);
        if(!isOtpValid) return res.status(400).json({message: "Invalid OTP"});

        if(newPassword.length < 8) return res.status(400).json({message: "Password must be at least 8 characters long"});

        const hashedPassword = await hashData(newPassword);
        await User.updateOne({email}, {password: hashedPassword});
        await deleteOtp(otp, existingUser.email);

        return res.status(200).json({message: "Password reset successful"});

    }catch(error){
        console.log(error);
        throw error;
    }
}
