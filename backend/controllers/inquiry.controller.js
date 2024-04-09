import Inquiry from "../models/InquiryModel.js";

// Create a new inquiry
export const createInquiry = async (req, res) => {
  try {
    const newInquiry = await Inquiry.create(req.body);
    res.status(201).json(newInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all inquiries
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single inquiry by ID
export const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an inquiry by ID
export const updateInquiry = async (req, res) => {
  try {
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json(updatedInquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an inquiry by ID
export const deleteInquiry = async (req, res) => {
  try {
    const deletedInquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deletedInquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
