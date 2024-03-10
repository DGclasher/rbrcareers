import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import applicantRoutes from "./routes/applicant.js";
import { initAdmin } from "./utils/init.admin.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
 
const PORT = process.env.PORT || 5000;
initAdmin();
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/jobs", applicantRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
