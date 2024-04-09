import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  user_id: [{
    type: String,
    ref: "User",
  }],
  property_id: [{
    type: mongoose.ObjectId,
    ref: "Property",
  }],
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
  status: {
    type: String,
    default: "Not Process",
    enum: ["New", "In Progress", "Completed", "Discarded"],
    
  },
}, {
  timestamps: true 
});

const inquiryModel = mongoose.model("inquiry", inquirySchema);

export default inquiryModel;
