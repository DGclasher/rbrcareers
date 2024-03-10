import Posting from "../models/posting.js";
import Application from "../models/application.js";
import { deleteFileFromFirebase } from "../utils/firebase.js";

export const deleteApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await Application.findById(id);
    await deleteFileFromFirebase(applicant.resumeUrl);
    await Application.findByIdAndDelete(id);
    return res.status(200).json({ message: "Applicant Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createJob = async (req, res) => {
  try {
    const { title, openings, description, location, type } =
      req.body;
    const newJob = await Posting.create({
      type,
      title,
      location,
      openings,
      description,
    });
    return res
      .status(201)
      .json({ message: "Job Created Successfully", data: newJob });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, openings, type } =
      req.body;
    const updatedJob = await Posting.findByIdAndUpdate(
      id,
      {
        type,
        title,
        location,
        openings,
        description,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Job Updated Successfully", data: updatedJob });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Posting.findByIdAndDelete(id);
    let applicants = await Application.find({ jobId: id });
    applicants.forEach(async applicant => {
      await deleteFileFromFirebase(applicant.resumeUrl);
      await Application.findByIdAndDelete(applicant._id);
    });
    return res.status(200).json({ message: "Job Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Posting.find();
    return res.status(200).json({ message: "Fetched all jobs", data: jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const applicants = await Application.find({ jobId: jobId });
    return res
      .status(200)
      .json({ message: "Fetched all applicants", data: applicants });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getApplicantById = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await Application.findById(id);
    return res
      .status(200)
      .json({ message: "Fetched applicant", data: applicant });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
