import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

{
  timestamps: true;
}

const feedbackModel = mongoose.model("feedback", feedbackSchema);

export default feedbackModel;
