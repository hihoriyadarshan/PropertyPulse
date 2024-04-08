import express from "express";
import { FeedbackCountController, createFeedback, get_all_feedback } from "../controllers/Feedback.controller.js";

const router = express.Router();

router.post("/create-feedback", createFeedback);

router.get("/getAllFeedback", get_all_feedback);

router.get("/feedback-count", FeedbackCountController);

export default router;
