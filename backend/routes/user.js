import express from "express";
import { getAllUsers, getById } from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifytoken.js";
const router = express.Router();

//get all
router.get("/", verifyAdmin, getAllUsers);

//get id
router.get("/:id", verifyUser, getById);

export default router;
