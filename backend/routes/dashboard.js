import express from "express";
import { CategoryCountController, FeedbackCountController, UserCountController, SubCategoryCountController, propertyCountController, ContactCountController, inquiryCountController } from "../controllers/dashboard.controller.js";

const router = express.Router();

// user-count
router.get("/user-count", UserCountController);

// Category-count
router.get("/category-count", CategoryCountController);

// Subcategory-count
router.get("/subcategory-count", SubCategoryCountController);

// Property -count
router.get("/property-count", propertyCountController);

// inqury -count
router.get("/inquiry-count", inquiryCountController);

// contact -count
router.get("/contact-count", ContactCountController);

// feedback-count
router.get("/feedback-count", FeedbackCountController);

export default router;