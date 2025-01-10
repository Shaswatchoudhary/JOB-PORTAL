import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config = {};
import userRoute from "./routes/user.route.js";

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

//api's

app.use("/api/user", userRoute);
//app.use("/api/company", companyRoute);
//app.use("/api/job", jobRoute);
//app.use("/api/application", applicationRoute);

const PORT = process.env.PORT | 5001;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at ${PORT}`);
});
