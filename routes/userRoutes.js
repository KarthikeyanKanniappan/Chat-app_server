import express from "express";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  registerUser,
  signin,
  allUsers,
} from "../controllers/userController.js";

router.post("/register", registerUser);
router.post("/login", signin);
router.get("/allUsers", protect, allUsers);

export default router;
