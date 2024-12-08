const generateOtp = () => {
    try {
        const otp = Math.floor(10000 + Math.random() * 90000).toString();
        return otp;
    } catch (error) {
        throw new Error("Failed to generate OTP");
    }
}

export default generateOtp;