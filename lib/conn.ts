import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// MongoDB Connection
const connectDB = async () => {
  try {
    if (!process.env.DB_URI) {
      throw new Error("DB_URI is missing from environment variables");
    }
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {console.error(error);
    process.exit(1);
  }
};

export default connectDB;
