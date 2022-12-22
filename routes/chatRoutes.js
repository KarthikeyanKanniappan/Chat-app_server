import express from "express";
const router = express.Router();
import protect from "../middleware/authMiddleware.js";
import { accessChats } from "../controllers/chatControllers.js";
router.post("/", protect, accessChats);
// router.get("/", fetchChats);
// router.post("/group", createGroupChat);
// router.put("/rename", renameGroup);
// router.put("/groupRemove", removeFromGroup);
// router.put("/groupAdd", addToGroup);

export default router;
