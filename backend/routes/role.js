import express from "express";
import {
  createRole,
  deleteRoles,
  getAllRoles,
  updateRole,
} from "../controllers/role.controller.js";
import { verifyAdmin } from "../utils/verifytoken.js";


const router = express.Router();

// create a new role in Database
router.post("/create", verifyAdmin, createRole);

//update Role in Database
router.put("/update/:id", verifyAdmin, updateRole);

//get All Roles from Database
router.get("/getAll", getAllRoles);

//delte Role from Database
router.delete("/deleteRole/:id", deleteRoles);

export default router;
