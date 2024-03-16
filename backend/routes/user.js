import express from "express";
import { getAllUsers, getById } from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifytoken.js";
const router = express.Router();

//get all
// router.get("/getAllUsers", verifyAdmin, getAllUsers);
router.get("/getAllUsers", getAllUsers);

//get id
router.get("/:id", getById);

export default router;
