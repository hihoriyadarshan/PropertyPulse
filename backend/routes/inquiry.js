import express from "express";
import {
  createInquiry,
  getInquiries,
  deleteInquiry,
} from "../controllers/inquiry.controller.js";

const router = express.Router();

// Create Inquires
router.post("/create-inquiry", createInquiry);

// Get All Inquires
router.get("/get-All-inquiry", getInquiries);

// Delete Inquires by Id

router.delete("/deleteinquiry/:id", deleteInquiry);

// Update Inquery

export default router;
