import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

const { JWT_SECRET_KEY } = process.env;

export const authMiddleware = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.currentUser = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};



