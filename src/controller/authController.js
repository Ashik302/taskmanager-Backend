import bcrypt from "bcryptjs";
import tokenGenerator from "../config/tokenGenerator.js";
import prisma from "../utils/prisma.js";

// REGISTER CONTROLLER
export const register = async (req, res) => {
    console.log("this is is ", req.body)
    const { username, email, password } = await req.body;

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        // Generate token
        const token = tokenGenerator(user.id);
        const expireTime = 3600 //in second
        return res.status(201).json({ user, token, expireTime });
    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// LOGIN CONTROLLER
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate token
        const token = tokenGenerator(user.id);

        const expireTime = 3600 //in second
        return res.status(200).json({ user, token, expireTime });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
