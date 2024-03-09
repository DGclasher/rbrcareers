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
  coverLetter: {
    type: String,
  },
  resumeUrl: {
    type: String,
  },
  qualifications: {
    type: [
      {
        degree: String,
        institute: String,
      },
    ],
  },
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
