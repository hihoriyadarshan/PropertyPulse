import express from "express";
import {
  PropertyPhotoController,
  createProperty,
  deletepropertyController,
  findPropertiesByUserId,
  getAllProperties,
} from "../controllers/property.controller.js";
import formidable from "express-formidable";

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

// Delete property By Id
router.delete("/deleteproperty/:id", deletepropertyController)


export default router;
