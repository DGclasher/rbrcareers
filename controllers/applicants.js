import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseConfig from "../config/firebaseconfig.js";
import Application from "../models/application.js";

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const uploadResumeToFirebase = async (resumeFile) => {
  try {
    const storageRef = ref(storage, `resumes/${resumeFile.originalname}`);
    await uploadBytes(storageRef, resumeFile.buffer);
    const resumeUrl = await getDownloadURL(storageRef);
    return resumeUrl;
  } catch (error) {
    console.error("Error uploading resume to Firebase:", error);
    throw error;
  }
};

export const applyJob = async (req, res) => {
  try {
    console.log(req.body.qualifications);
    const {
      jobId,
      applicantName,
      applicantEmail,
      applicantPhone,
      coverLetter,
      qualifications,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded" });
    }
    const resumeUrl = await uploadResumeToFirebase(req.file);
    const application = await Application.create({
      jobId: jobId,
      applicantName: applicantName,
      applicantEmail: applicantEmail,
      applicantPhone: applicantPhone,
      coverLetter: coverLetter,
      resumeUrl: resumeUrl,
      qualifications: qualifications,
    });
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
    const allJobs = await Posting.find(
      { isAvailable: true },
      { title: 1, location: 1, type: 1, postedOn: 1 }
    );
    return res.status(200).json(allJobs);
  } catch (error) {}
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Posting.findById(id);
    return res.status(200).json(job);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
