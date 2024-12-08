import Otp from "./model.js";

import generateOtp from "../util/generateOtp.js";
import dotenv from "dotenv";
import { hashData } from "../util/hashData.js";
import sendEmail from "../util/sendEmailOtp.js";

dotenv.config();

const { EMAIL_USER } = process.env;

export const sendOtp = async (email, subject, message, duration =1) => {
    try {
        if (!email || !subject || !message) {
            throw new Error("Email, subject, and message are required");
        }

        await Otp.deleteOne({ email });

        const otp = generateOtp();

        const mailOptions = {
            from: EMAIL_USER,
            to: email,
            subject: subject,
            html: `<p>${message}</p><p>OTP: ${otp}</p><p>This OTP will expire in ${duration} minutes</p>`,
        };

        await sendEmail(mailOptions);

        const hashedOtp = await hashData(otp);
        const newOtp = new Otp({ 
            email,
            otp: hashedOtp,
            duration,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + duration * 60 * 1000),
        });

        const savedOtp = await newOtp.save();
        return savedOtp;

    } catch (error) {
        console.error("Gagal mengirim OTP:", error);
        throw new Error("Gagal mengirim OTP: " + error.message);
    }
    
}


