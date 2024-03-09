import express from "express";
import multer from "multer";
import { applyJob, getAllJobs, getJobById } from "../controllers/applicants.js";

const router = express.Router();

router.get("/:id", getJobById);
router.get("/allJobs", getAllJobs);
router.post("/apply", multer().single("resume"), applyJob);

export default router;
