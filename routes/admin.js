import express from "express";
import { verifyAdmin } from "../middleware/auth.js";
import {
  createJob,
  getAllJobs,
  getApplicants,
  downloadResume,
  deleteApplicant,
  getApplicantById,
} from "../controllers/admin.js";

const router = express.Router();

router.post("/job", verifyAdmin, createJob);
router.get("/jobs", verifyAdmin, getAllJobs);
router.get("/job/:id", verifyAdmin, getApplicants);
router.get("/resume/:id", verifyAdmin, downloadResume);
router.get("/applicant/:id", verifyAdmin, getApplicantById);
router.delete("/applicant/:id", verifyAdmin, deleteApplicant);

export default router;
