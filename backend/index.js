import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authroutes.js"
import testRouter from "./routes/testRoutes.js";
import recordRouter from "./routes/recordRoutes.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// Connect to MongoDB
const main = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Disconnected to MongoDB", error);
  }
};
main();

app.use("/api/auth", authRoutes);
app.use("/api/test",testRouter);
app.use("/api/record",recordRouter);

app.listen(5000, () => console.log("Server running on port 5000"));
