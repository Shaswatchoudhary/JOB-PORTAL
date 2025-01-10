import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config = {};

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5121"],
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT | 50011;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at ${PORT}`);
});
