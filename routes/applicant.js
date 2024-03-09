import multer from "multer";
import express from "express";
import upload from "../middleware/multer.js";
import {
  applyJob,
  getJobById,
  getAllJobs,
} from "../controllers/applicants.js";

const router = express.Router();

router.get("/allJobs", getAllJobs);
router.get("/:id", getJobById);

router.post(
  "/apply",
  (req, res, next) => {
    upload.single("resume")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ message: "File is too large. Max file size is 150KB" });
      } else if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  applyJob
);

export default router;
