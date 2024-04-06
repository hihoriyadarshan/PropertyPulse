import categoryModel from "../models/categoryModel.js";
import subCategoryModel from "../models/sub-categoryModel.js";
import slugify from "slugify";

// create property
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in Category",
    });
  }
};

// create sub-category

export const createSubCategoryController = async (req, res) => {
  try {
    const { s_name, category } = req.body;

    // Check if required fields are present
    if (!s_name || !category) {
      return res.status(400).json({ error: "Name and category are required" });
    }

    // Check if the specified category exists
    const existingCategory = await categoryModel.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ error: "Category not found" });
    }

    // Check if the sub-category already exists within the specified category
    const existingSubCategory = await subCategoryModel.findOne({
      s_name,
      category,
    });
    if (existingSubCategory) {
      return res
        .status(400)
        .json({ error: "This sub-category already exists" });
    }

    const subCategory = new subCategoryModel({
      s_name,
      category,
      slug: slugify(s_name),
    });

    await subCategory.save();

    res
      .status(201)
      .json({ message: "Sub-category created successfully", subCategory });
  } catch (error) {
    console.error("Sub-category creation error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the sub-category" });
  }
};

// featch category
export const fetchCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching categories" });
  }
};
