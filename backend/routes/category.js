import express from "express";
import {
  createCategoryController,
  createSubCategoryController,
  fetchCategoriesController,
} from "../controllers/category.controller.js";

const router = express.Router();

// create category
router.post("/create-category", createCategoryController);

// create-sub caategory
router.post("/create-subcategories", createSubCategoryController);

router.get("/fetch-categories", fetchCategoriesController);

export default router;
