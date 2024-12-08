import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const { JWT_SECRET_KEY, JWT_EXPIRY } = process.env

export const generateToken = async (
    tokenData, 
    tokenKey = JWT_SECRET_KEY, 
    tokenExpiry = JWT_EXPIRY
) => {
    try{
        const token = jwt.sign(tokenData, tokenKey, { expiresIn: tokenExpiry })
        return token
    }catch(error){
       throw new Error(error.message || "Error generating token")
    }
}
