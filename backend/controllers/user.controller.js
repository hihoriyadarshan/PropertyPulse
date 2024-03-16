import User from "../models/User.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

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
