import express from "express";
import {
  createContact,
  // getAllContacts,
  getAllUsers,
  getById,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifytoken.js";
const router = express.Router();

//get all
// router.get("/getAllUsers", verifyAdmin, getAllUsers);
router.get("/getAllUsers", getAllUsers);

//get id
router.get("/:id", getById);

// create contact
router.post("/createcontact", createContact);

//get All contact (Admin)
// router.get("/contacts", getAllContacts);

export default router;
