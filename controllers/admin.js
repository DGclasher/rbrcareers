import Posting from "../models/posting.js";
import Application from "../models/application.js";
import { exportCsv } from "../utils/export-csv.js";
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
    const { title, description, location, type } = req.body;
    const newJob = await Posting.create({
      type,
      title,
      location,
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
    const { title, description, location, type } = req.body;
    const updatedJob = await Posting.findByIdAndUpdate(
      id,
      {
        type,
        title,
        location,
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
    applicants.forEach(async (applicant) => {
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

const normalizeJobName = async (id) => {
  try {
    const job = await Posting.findById(id);
    return job.title.replace(/\s/g, "_");
  } catch (error) {
    console.log(error);
    return "job_applicants";
  }
};

export const exportApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    const applications = await Application.find({ jobId: id });
    const csvStream = await exportCsv(applications);
    const fileName = await normalizeJobName(id);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fileName}.csv`
    );
    csvStream.pipe(res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
