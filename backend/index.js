import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// Database Connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database");
  } catch (error) {
    throw error;
  }
};
// 15:00
// app.use("/api/role");

app.listen(8800, () => {
  connectMongoDB();
  console.log("Connected to server!");
});
