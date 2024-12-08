import nodemailer from "nodemailer";
import dotenv from "dotenv";
const { EMAIL_USER, EMAIL_PASS } = process.env;

dotenv.config();

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

// test transporter
transporter.verify((err, success) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to email server");
            console.log(success);
        }
});

const sendEmail = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        throw new Error("Failed to send email");
    }
}

export default sendEmail;
