import express from "express";
import upload from "../middleware/multer.js";
import { applyJob } from "../controllers/applicants.js";

const router = express.Router();

router.post("/apply", upload.single("resume"), applyJob);

export default router;
