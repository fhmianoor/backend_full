import express from "express";
import { registerUser, authenticateUser } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Trim inputs
        const trimmedUsername = username?.trim();
        const trimmedEmail = email?.trim();
        const trimmedPassword = password?.trim();

        // Validate inputs
        if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!/^[a-zA-Z0-9]+$/.test(trimmedUsername)) {
            return res
                .status(400)
                .json({ message: "Username must contain only letters and numbers" });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        if (trimmedPassword.length < 8) {
            return res
                .status(400)
                .json({ message: "Password must be at least 8 characters long" });
        }

        // Create user
        const user = await registerUser({
            username: trimmedUsername,
            email: trimmedEmail,
            password: trimmedPassword,
        });

        // Return success response
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ message: "An error occurred while registering user" });
    }
});

router.post("/login", async (req, res) => {
    try{
        let { email, password } = req.body
        email = email.trim()
        password = password.trim()
        // Cek apakah email dan password ada
        if(!(email && password)){
            throw new Error("All fields are required")
        }

        const user = await authenticateUser({email, password})
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                token: user.token,
            },
        })
    }catch(error){
        throw new Error(error.message || "Failed to login user")
    }


})

router.get("/profile", authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Profile retrieved successfully",
        user: req.currentUser,
    });
});


export default router;
