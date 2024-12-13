import express from "express"
import cors from "cors"
import userRoute from "./routes/user.route.js"
import otpRoute from "./otp/otp.route.js"
import emailRoute from "./email_verify/email.route.js"
import forgotPasswordRoute from "./forgot_password/route.js"
import { otpRateLimiter } from "./otp/otp.controller.js"
import rateLimit from "express-rate-limit"

const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/user", userRoute)
app.use("/api/otp", otpRateLimiter, otpRoute)
app.use("/api/email_verify", emailRoute)
app.use("/api/forgot_password", forgotPasswordRoute)
export default app