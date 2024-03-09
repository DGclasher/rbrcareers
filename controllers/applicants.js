import Posting from "../models/posting.js";
import Application from "../models/application.js";
import { uploadResumeToFirebase } from "../utils/firebase.js";

export const applyJob = async (req, res) => {
  try {
    const {
      jobId,
      coverLetter,
      applicantName,
      applicantEmail,
      applicantPhone,
      qualifications,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded" });
    }
    const application = await Application.create({
      jobId: jobId,
      coverLetter: coverLetter,
      applicantName: applicantName,
      applicantEmail: applicantEmail,
      applicantPhone: applicantPhone,
      qualifications: qualifications,
    });
    const resumeUrl = await uploadResumeToFirebase(req.file, application._id);
    application.resumeUrl = resumeUrl;
    await application.save();
    return res
      .status(201)
      .json({ message: "Applied successfully", data: application });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Posting.find(
      { isAvailable: true },
      { title: 1, description: 1, location: 1, totalOpenings: 1, _id: 1 }
    );
    return res.status(200).json({ message: "Fetched all jobs", data: jobs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Posting.findById(id);
    return res.status(200).json({ message: "Fetched job", data: job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
