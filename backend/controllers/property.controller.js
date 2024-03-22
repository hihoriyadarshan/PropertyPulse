// property.controller.js

import Property from "../models/Property.js";
import slugify from "slugify";
import fs from "fs";

// Create property
export const createProperty = async (req, res) => {
  try {
    // Check if req.fields is undefined
    if (!req.fields) {
      return res.status(400).send({ error: "Form data not parsed correctly" });
    }

    const {
      name,
      address,
      description,
      type,
      price,
      sqft,
      latitude,
      longitude,
    } = req.fields;
    const { photo } = req.files;

    // Validation
    const requiredFields = [
      "name",
      "address",
      "description",
      "type",
      "price",
      "sqft",
      "latitude",
      "longitude",
    ];
    for (const field of requiredFields) {
      if (!req.fields[field]) {
        return res.status(400).send({ error: `${field} is required` });
      }
    }

    if (photo && photo.size > 1000000) {
      return res
        .status(400)
        .send({ error: "Photo is required and should be less than 1MB" });
    }

    // Assuming you have access to the user ID in your request
    const userId = req.userId; // Replace req.userId with how you access user ID from the request

    // Create a new property instance
    const property = new Property({
      ...req.fields,
      user_id: userId, // Assigning user ID to user_id field
      slug: slugify(name),
    });

    // Save photo data if available
    if (photo) {
      property.photo.data = fs.readFileSync(photo.path);
      property.photo.contentType = photo.type;
    }

    // Save property to the database
    await property.save();

    // Respond with success message and the created property
    res.status(201).send({
      success: true,
      message: "Property Created Successfully",
      property,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in creating property",
    });
  }
};
