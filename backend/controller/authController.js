import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModels.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("test", token, {
            httpOnly: process.env.NODE_ENV === "development",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("test", token, {
            httpOnly: process.env.NODE_ENV === "development",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Login successful",  user });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("test", "", { expires: new Date(0), httpOnly: true });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error in checkUser:", error);
        res.status(401).json({ message: "Invalid token" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ users });
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
