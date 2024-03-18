import User from "../models/User.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import ContactModel from "../models/ContactModel.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(CreateSuccess(200, "All Users", users));
    //return next(CreateSuccess(200, "All Users", users))
  } catch (error) {
    return res.status(500).json(CreateError(500, "Internal Server Error!!"));
    //return next(CreateError(500, "Internal Server Error!!"))
  }
};

export const getById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json(CreateError(404, "User is not found"));
    return res.status(200).json(CreateSuccess(200, "Single User", user));
  } catch (error) {
    return res.status(500).json(CreateError(500, "Internal server Error"));
  }
};


// contact-us
export const createContact = async (req, res) => {
  try {
    const { name, subject, email, message } = req.body;

    const newContact = new ContactModel({
      name,
      subject,
      email,
      message,
    });

    await newContact.save();

    res
      .status(201)
      .json({ success: true, message: "Contact created successfully" });
  } catch (error) {
    console.error("Error creating contact:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create contact" });
  }
};

//get all contact deatils(Admin)

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete contact
export const deleteContactController = async (req, res) => {
  try {
    const { id } = req.params;
    await ContactModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Contact Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Contact while deleting user",
      error,
    });
  }
};


