import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MongoDB URI is not defined in environment variables.");
    }
    // No additional options needed for Mongoose 6+ and MongoDB Node.js Driver 4.0+
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
