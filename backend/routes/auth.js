import express from "express";
import {
  changePassword,
  deleteContactController,
  deleteuserController,
  getAllContacts,
  login,
  register,
  registerAdmin,
  resetPassword,
  sendEmail,
  updateProfile,
} from "../controllers/auth.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifytoken.js";

const router = express.Router();

//register

router.post("/register", register);

//login
router.post("/login", login);

//register as admin
router.post("/register-admin", registerAdmin);

//send reset email
router.post("/send-email", sendEmail);

//reset-password
router.post("/reset-password", resetPassword);

// profile update
router.post("/profile-update/:id", updateProfile);

// router.post("/createcontact", createContact);
router.get("/contacts", getAllContacts);

// User Delete by Id
router.delete("/deleteuser/:id", deleteuserController);

// delete contact by Id
router.delete("/deletecontact/:id", deleteContactController);

// change password
router.post("/change-password", changePassword);

export default router;
