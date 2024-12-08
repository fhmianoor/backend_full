import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error)
    }
}

export default connectDB()
