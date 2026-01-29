import mongoose from "mongoose";
import dotenv from "dotenv";

// Load your .env file
dotenv.config();

const testConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected:", conn.connection.host);
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

testConnect();
