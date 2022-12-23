import express from "express";
const router = express.Router();
import protect from "../middleware/authMiddleware.js";
import {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} from "../controllers/chatControllers.js";
router.post("/", protect, accessChats);
router.get("/", protect, fetchChats);
router.post("/group", protect, createGroupChat);
router.put("/rename", protect, renameGroup);
router.put("/groupRemove", protect, removeFromGroup);
router.put("/groupAdd", protect, addToGroup);

export default router;
