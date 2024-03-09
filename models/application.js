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
  resume: {
    data: Buffer,
    contentType: String,
  },
  education: {
    list: [
      {
        degree: String,
        major: String,
        university: String,
        year: Number,
      }
    ]
  }
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
