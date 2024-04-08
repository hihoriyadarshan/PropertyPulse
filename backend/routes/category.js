import express from "express";
import {
  createCategoryController,
  createSubCategoryController,
  deleteCategoryController,
  deleteSubCategoryController,
  fetchCategoriesController,
  fetchSubCategoriesController,
  getAllCategory,
  getAllsubCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

// create category
router.post("/create-category", createCategoryController);

// create-sub caategory
router.post("/create-subcategories", createSubCategoryController);

// fetch category
router.get("/fetch-categories", fetchCategoriesController);

// fetch sub-category
router.get("/fetch-subcategories", fetchSubCategoriesController);

// Get All category
router.get("/getAllcategory", getAllCategory);

// Get All sub-category
router.get("/getAllsubcategories", getAllsubCategory);

// Delete category

router.delete("/deletecategory/:id", deleteCategoryController);


// Delete SubCategory
router.delete("/deletesubcategory/:id", deleteSubCategoryController);


export default router;
