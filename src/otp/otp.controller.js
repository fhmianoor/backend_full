import Otp from "./model.js";

import generateOtp from "../util/generateOtp.js";
import dotenv from "dotenv";
import { hashData, verifyHash } from "../util/hashData.js";
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
        console.error("Otp failed to send:", error);
        throw new Error("Otp failed to send : " + error.message);
    }
    
}

export const verifyOtp = async (email, otp) => {
    if (!(otp && email)) {
        throw new Error("provide email and otp");
    }
    const otpDocument = await Otp.findOne({ email });

    if(!otpDocument) {
        throw new Error("OTP not found");
    }

    const {expiresAt} = otpDocument;
    if(expiresAt < new Date()) {
        throw new Error("OTP expired");
    }
    const hashedOtp = otpDocument.otp;
    const isOtpMatch = await verifyHash(otp, hashedOtp);
    return isOtpMatch;

    

   
}

export const deleteOtp = async (email) => {
    try {
        await Otp.deleteOne({ email });
    } catch (error) {
        throw new Error("Error deleting OTP: " + error.message);
    }
}