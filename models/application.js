import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posting",
  },
  applicantName: {
    type: String,
    required: true,
  },
  applicantEmail: {
    type: String,
    required: true,
  },
  applicantPhone: {
    type: String,
    required: true,
  },
  resumeUrl: {
    type: String,
  },
  qualifications: {
    type: [
      {
        degree: String,
        college: String,
        university: String,
      },
    ],
  },
  yearsOfExperience: {
    type: Number,
  },
  semester: {
    type: String,
  },
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
