import express from "express";
import formidable from "express-formidable";
import {
  PropertyPhotoController,
  createProperty,
  deletepropertyController,
  findPropertiesByUserId,
  getAllProperties,
  getPropertyById,
} from "../controllers/property.controller.js";

const router = express.Router();

// Use formidable middleware to parse form data
router.use(formidable());

// create property
router.post("/create_property", createProperty);

//get user_id All peroperty
router.get("/user_property/:id", findPropertiesByUserId);

// Get All property
router.get("/getAllproperty", getAllProperties);

// get property photo
router.get("/:id", PropertyPhotoController);

//  get Single property by Property Id
router.get("/getPropertyById/:id",getPropertyById);

// Delete property By Id
router.delete("/deleteproperty/:id", deletepropertyController);

export default router;
