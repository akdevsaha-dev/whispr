import express from "express"
import { createChat, createGroupChat, getChatById, getUserChats } from "../controllers/chat.controllers"
const router = express.Router()

router.post("/create", createChat)
router.post("/create/group", createGroupChat)
router.get("/all/:userId", getUserChats)
router.get("/:chatId", getChatById)

export default router;


