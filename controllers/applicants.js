import Posting from "../models/posting.js";
import Application from "../models/application.js";
import { uploadResumeToFirebase } from "../utils/firebase.js";

export const applyJob = async (req, res) => {
  try {
    const {
      jobId,
      applicantName,
      applicantEmail,
      applicantPhone,
      qualifications,
      yearsOfExperience,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded" });
    }
    const application = await Application.create({
      jobId: jobId,
      applicantName: applicantName,
      applicantEmail: applicantEmail,
      applicantPhone: applicantPhone,
      qualifications: qualifications,
      yearsOfExperience: yearsOfExperience,
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
    let jobs = await Posting.find(
      { isAvailable: true },
      {
        _id: 1,
        type: 1,
        title: 1,
        location: 1,
        postedOn: 1,
        openings: 1,
      }
    );
    jobs = jobs.map(job => {
      return {
        ...job.toObject(),
        id: job._id
      };
    });
    console.log(jobs);
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
