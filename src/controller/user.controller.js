import User from "../models/user.js";
import { hashData, verifyHash } from "../util/hashData.js";
import { generateToken } from "../util/generateToken.js";

export const registerUser = async (data) => {
    try {
        const { username, email, password } = data;

        // Cek apakah email sudah digunakan
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash password
        const hashedPassword = await hashData(password);

        // Simpan user ke database
        const createdUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return createdUser; // Data user berhasil disimpan
    } catch (error) {
        throw new Error(error.message || "Failed to register user");
    }
};


export const authenticateUser = async (data) => {
    try{
        const { email, password } = data

        const fetchedUser = await User.findOne({email})
        if(!fetchedUser){
            throw new Error("User does not exist")
        }

        if(!fetchedUser.verify){
            throw new Error("User is not verified")
        }

        const hashedPassword = fetchedUser.password
        const isMatch = await verifyHash(password, hashedPassword)
        if(!isMatch){
            throw new Error("Invalid password")
        }

        // Generate token
        const tokenData = {
            id: fetchedUser._id,
            email: fetchedUser.email
        }
        const token = await generateToken(tokenData)
        fetchedUser.token = token
        return fetchedUser

    }catch(error){
        throw new Error(error.message || "Failed to authenticate user")
    }
}
