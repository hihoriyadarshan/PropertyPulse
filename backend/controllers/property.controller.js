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
      user_id,
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
      "user_id",
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

    const property = new Property({
      user_id: user_id || req.userId,
      name,
      address,
      description,
      type,
      price,
      sqft,
      latitude,
      longitude,
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

// Get property find by Id
// Controller function to find properties by user_id
export const findPropertiesByUserId = async (req, res) => {
  const { id } = req.params; // Assuming 'id' is the parameter for user_id

  try {
    const properties = await Property.find({ user_id: id });

    if (!properties || properties.length === 0) {
      return res
        .status(404)
        .json({ message: "No properties found for the provided user_id" });
    }

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  get All property
export const getAllProperties = async (req, res) => {
  try {
    // Query all properties from the database
    const properties = await Property.find();

    // Check if there are no properties
    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }

    // If properties exist, return them
    res.status(200).json(properties);
  } catch (error) {
    // If an error occurs, return an error response
    res.status(500).json({ message: error.message });
  }
};

// Get All photo



// get photo product id
export const PropertyPhotoController = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).select("photo");

    if (!property || !property.photo || !property.photo.data) {
      return res.status(404).send({
        success: false,
        message: "Photo not found for the provided property ID",
      });
    }

    res.set("Content-type", property.photo.contentType);
    return res.status(200).send(property.photo.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error: error.message,
    });
  }
};


