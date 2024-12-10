import { sendOtp, verifyOtp, deleteOtp } from "../otp/otp.controller.js";
import User from "../models/user.js"

export const verifyEmail = async (userEmail) => {
    try {
        const existingUser = await User.findOne({ email: userEmail });
        if (!existingUser) {
            throw new Error("User not found");
        }

        const otpDetails = {
            email: existingUser.email,
            subject: "Email Verification",
            message: "Please verify your email",
            duration: 2
        }
        const createdOtp = await sendOtp(otpDetails.email, otpDetails.subject, otpDetails.message, otpDetails.duration);
        return createdOtp;

    } catch (error) {
        throw new Error(error.message || "Failed to verify email");
    }
}

export const verifyEmailOtp = async (email, otp) => {
    try{
        const validOtp = await verifyOtp(email, otp);

        if(!validOtp){
            throw new Error("Invalid OTP");
        }

        await deleteOtp(email);
        return true;
    }catch(error){
        throw new Error(error.message || "Failed to verify email OTP");
    }
}
