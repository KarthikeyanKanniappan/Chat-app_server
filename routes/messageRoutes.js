import express from "express";
import { allMessage, sendMessage } from "../controllers/messageController.js";
const router = express.Router();
import protect from "../middleware/authMiddleware.js";

router.post("/", protect, sendMessage);
router.get("/:chatId", protect, allMessage);

export default router;
