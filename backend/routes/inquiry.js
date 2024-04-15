import express from "express";
import {
  createInquiry,
  getInquiries,
  deleteInquiry,
  findinquiryByUserId,
} from "../controllers/inquiry.controller.js";

const router = express.Router();

// Create Inquires
router.post("/create-inquiry", createInquiry);

// Get All Inquires
router.get("/get-All-inquiry", getInquiries);

// Delete Inquires by Id

router.delete("/deleteinquiry/:id", deleteInquiry);

// find user_id
router.get("/user_inquiry/:id", findinquiryByUserId);

export default router;
