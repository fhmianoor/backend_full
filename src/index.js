import express from "express"
import cors from "cors"
import userRoute from "./routes/user.route.js"
import otpRoute from "./otp/otp.route.js"

const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/user", userRoute)
app.use("/api/otp", otpRoute)

export default app