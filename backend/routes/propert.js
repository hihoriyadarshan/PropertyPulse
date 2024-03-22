// property.js

import express from "express";
import { createProperty } from "../controllers/property.controller.js";
import formidable from "express-formidable";

const router = express.Router();

// Use formidable middleware to parse form data
router.use(formidable());

router.post("/create_property", createProperty);

export default router;
