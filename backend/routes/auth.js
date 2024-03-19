import express from "express";
import {
  getAllContacts,
  login,
  register,
  registerAdmin,
  resetPassword,
  sendEmail,
  updateProfile,
} from "../controllers/auth.controller.js";

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

export default router;
