import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import nodemailer from "nodemailer";
import UserToken from "../models/UserToken.js";
import { response } from "express";
import ContactModel from "../models/ContactModel.js";
import slugify from "slugify";
import fs from "fs";

// user registration
export const register = async (req, res, next) => {
  const role = await Role.find({ role: "User" });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    address: req.body.address,
    phone: req.body.phone,
    roles: role,
  });
  await newUser.save();
  return res.status(200).json("User Register Sucessfully");
};

//role registration
export const registerAdmin = async (req, res, next) => {
  const role = await Role.find({});
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    address: req.body.address,
    phone: req.body.phone,
    isAdmin: true,
    roles: role,
  });
  await newUser.save();
  return next(CreateSuccess(200, "Admin Register Sucessfully"));
};

// login controller
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles",
      "role"
    );
    const { roles } = user;
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).send("Username or Password incorrect");
    }
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        roles: roles,
      },
      process.env.Jwt_SECRET
    );
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ status: 200, message: "Login sucess", data: user });
    // return next(CreateSuccess(200, "Login Sucessfully!"));
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
};

//Send Email to forger password
export const sendEmail = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({
    email: { $regex: "^" + email + "$", $options: "i" },
  });
  if (!user) {
    return next(CreateError(404, "User not found to rest the email!"));
  }
  const payload = {
    email: user.email,
  };
  const expiryTime = 300;
  const token = jwt.sign(payload, process.env.Jwt_SECRET, {
    expiresIn: expiryTime,
  });

  const newToken = new UserToken({
    userId: user._id,
    token: token,
  });

  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ghostthepunisher3194@gmail.com",
      pass: "npimbymlatnfyvkm",
    },
  });
  let mailDetails = {
    from: "ghostthepunisher3194@gmail.com",
    to: email,
    subject: "Reset Password!",
    html: `
    <html>
    <head>
    <title>Password Reset Request</title>
    </head>
    <body>
    <p>Dear ${user.username},</p>
    <p>we have recieved a request to reset your password for your account with PropertyPlus.To Complete the password reset process, please click on the button below :</p>
    <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color: #4cAF50; color: white;  padding: 14px 20px; border:none; cursor:pointer; border-radius: 4px;">Reset Password</button></a> 
    <p>please note that this link is only valid for a 5 minutes.If you did not request  a password reset, please disregard this message </p>
    <p>Thank you </p>
   
    </body>
    </html>
    `,
  };
  mailTransporter.sendMail(mailDetails, async (err, data) => {
    if (err) {
      console.log(err);
      return next(
        CreateError(500, "Something went wrong while sending the email ")
      );
    } else {
      await newToken.save();
      return next(CreateSuccess(200, "Email-send Successfully"));
    }
  });
};

// Reset password(Forget)
export const resetPassword = (req, res, next) => {
  const token = req.body.token;
  const newPassword = req.body.password;

  jwt.verify(token, process.env.Jwt_SECRET, async (err, data) => {
    if (err) {
      return next(CreateError(500, "Reset link is Expired!"));
    } else {
      const response = data;
      const user = await User.findOne({
        email: { $regex: "^" + response.email + "$", $options: "i" },
      });
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(newPassword, salt);
      user.password = encryptedPassword;
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: user },
          { new: true }
        );
        return next(CreateSuccess(200, "Reset Password Sucessfully"));
      } catch (error) {}
      return next(
        CreateError(500, "Something went wrong while resetting the password")
      );
    }
  });
};



// Delete By ID user
export const deleteuserController = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "User not delete Internal server error",
      error,
    });
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

//delete contact id
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

// change Password

export const changePassword = async (req, res, next) => {
  try {
    // Extract user id from request, assuming it's stored in req.userId after authentication
    const userId = req.userId;

    // Fetch user by id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare current password with the password stored in the database
    const isPasswordValid = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Generate hash for new password
    const salt = await bcrypt.genSalt(10);
    const hashNewPassword = await bcrypt.hash(req.body.newPassword, salt);

    // Update user's password with the new hashed password
    user.password = hashNewPassword;

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};



// Profile update controller
export const updateProfile = async (req, res) => {
  const { id } = req.params; // Destructure 'id' from request params

  try {
    // Find the user by id
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user profile based on request body
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.username = req.body.username;
    user.email = req.body.email;

    // Make sure to update all necessary fields accordingly

    // Save the updated user
    await user.save();

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

 