import mongoose from "mongoose";

const postingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  requirements: {
    type: [String],
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Open",
  },
  totalOpenings: {
    type: Number,
    required: true,
  },
});

const Posting = mongoose.model("Posting", postingSchema);
export default Posting;
