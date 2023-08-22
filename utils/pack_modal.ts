import mongoose from "mongoose";
const PackSchema = new mongoose.Schema({
  customId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  questions: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  popular: {
    type: Boolean,
    default: false,
  },
  reviewed: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: [String],
    required: true
  },
});

export default mongoose.models.Pack || mongoose.model("Pack", PackSchema);
