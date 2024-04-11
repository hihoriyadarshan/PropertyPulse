import UserModel from "../models/User.js"
import categoryModel from "../models/categoryModel.js";
import subCategoryModel from "../models/sub-categoryModel.js";
import Property from "../models/Property.js";
import Inquiry from "../models/InquiryModel.js";
import ContactModel from "../models/ContactModel.js";
import FeedbackModel from "../models/FeedbakModel.js";
import inquiryModel from "../models/InquiryModel.js";



//User count
export const UserCountController = async (req, res) => {
    try {
      const total = await UserModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in User count",
        error,
        success: false,
      });
    }
  };


//Category count

export const CategoryCountController = async (req, res) => {
    try {
      const total = await categoryModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in Category count",
        error,
        success: false,
      });
    }
  };

// SubCategory count

export const SubCategoryCountController = async (req, res) => {
    try {
      const total = await subCategoryModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in SubCategory count",
        error,
        success: false,
      });
    }
  };


// Count Property

export const propertyCountController = async (req, res) => {
    try {
      const total = await Property.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in Property count",
        error,
        success: false,
      });
    }
  };


//  inquiry count

export const inquiryCountController = async (req, res) => {
    try {
      const total = await inquiryModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in inquiry count",
        error,
        success: false,
      });
    }
  };


//  Contact count

export const ContactCountController = async (req, res) => {
    try {
      const total = await ContactModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in Contact count",
        error,
        success: false,
      });
    }
  };  



//feedback count
export const FeedbackCountController = async (req, res) => {
    try {
      const total = await FeedbackModel.find({}).estimatedDocumentCount();
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