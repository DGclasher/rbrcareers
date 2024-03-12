import express from "express";
import { verifyAdmin } from "../middleware/auth.js";
import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getApplicants,
  deleteApplicant,
  getApplicantById,
  exportApplicants,
} from "../controllers/admin.js";

const router = express.Router();

router.post("/job", verifyAdmin, createJob);
router.get("/jobs", verifyAdmin, getAllJobs);
router.patch("/job/:id", verifyAdmin, updateJob);
router.delete("/job/:id", verifyAdmin, deleteJob);
router.get("/job/:id", verifyAdmin, getApplicants);
router.get("/applicant/:id", verifyAdmin, getApplicantById);
router.delete("/applicant/:id", verifyAdmin, deleteApplicant);
router.get("/export/:id", verifyAdmin, exportApplicants);

export default router;
