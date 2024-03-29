import mongoose from "mongoose";

const postingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: {
      responsibilities: {
        type: String,
        required: true,
      },
      requirements: {
        type: String,
        required: true,
      },
      stipend: {
        type: Number,
      },
    },
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const Posting = mongoose.model("Posting", postingSchema);
export default Posting;
