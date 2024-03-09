import Posting from "../models/posting.js";
import Application from "../models/application.js";

export const createJob = async (req, res) => {
    try {
        const { title, description, requirements, location, totalOpenings } = req.body;
        const newJob = await Posting.create({
            title,
            description,
            requirements,
            location,
            totalOpenings,
        });
        return res.status(201).json({message: "Job Created Successfully", data: newJob});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Posting.find();
        return res.status(200).json(jobs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const applicants = await Application.find({ jobId: jobId });
    return res.status(200).json(applicants);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getApplicantById = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await Application.findById(id);
    return res.status(200).json(applicant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const downloadResume = async (req, res) => {
  try {
    const {id} = req.params;
    const applicant = await Application.findById(id);
    res.set({
      "Content-Type": applicant.resume.contentType,
    });
    return res.send(applicant.resume.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const deleteApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    await Application.findByIdAndDelete(id);
    return res.status(200).json({ message: "Applicant Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
