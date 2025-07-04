import express from "express"
import { createChat, createGroupChat, getChatById, getUserChats } from "../controllers/chat.controllers"
import { protectRoute } from "../middleware/protectRoute"
const router = express.Router()

router.post("/create", protectRoute, createChat)
router.post("/create/group", protectRoute, createGroupChat)
router.get("/all/:userId", protectRoute, getUserChats)
router.get("/:chatId", protectRoute, getChatById)

export default router;


