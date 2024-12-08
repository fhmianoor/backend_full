import app from "./index.js"
import connectDB from "./config/db.js"
const PORT = process.env.PORT
connectDB




const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.error(error)
    }
}

startServer()
