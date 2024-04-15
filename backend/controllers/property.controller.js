import Property from "../models/Property.js";
import FeedbackModel from "../models/FeedbakModel.js";
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
      Rent_sell,
      longitude,
      category,
      subcategory,
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
      "Rent_sell",
      "longitude",
      "category",
      "subcategory",
    ];
    for (const field of requiredFields) {
      if (!req.fields[field]) {
        return res.status(400).send({ error: `${field} is required` });
      }
    }

    if (photo && photo.size > 10000000) {
      return res
        .status(400)
        .send({ error: "Photo is required and should be less than 10MB" });
    }

    const property = new Property({
      user_id: user_id || req.userId,
      name,
      address,
      description,
      type,
      price,
      sqft,
      Rent_sell,
      longitude,
      category,
      subcategory,
      slug: slugify(name),
    });

   
    if (photo) {
      property.photo.data = fs.readFileSync(photo.path);
      property.photo.contentType = photo.type;
    }

    await property.save();

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

// Get property find by User Id
export const findPropertiesByUserId = async (req, res) => {
  const { id } = req.params; 

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
    const properties = await Property.find();
    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }
    res.status(200).json(properties);
  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
};


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

// delete property
export const deletepropertyController = async (req, res) => {
  try {
    const { id } = req.params;
    await Property.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Property Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Property not delete Internal server error",
      error,
    });
  }
};


// Count Property
export const PropertyCountController = async (req, res) => {
  try {
    const total = await Property.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in Feedback count",
      error,
      success: false,
    });
  }
};


// get Single property
export const getPropertyById = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Error finding property by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//property filters
export const getFilteredProperties = async (req, res) => {
  try {
    const { minPrice, maxPrice, rent_sell } = req.query;

    // Constructing the filter object
    const filter = {};
    if (minPrice && maxPrice) {
      filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    }
    if (rent_sell) {
      filter.Rent_sell = rent_sell;
    }

    // Fetch properties based on filters
    const properties = await Property.find(filter);

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};