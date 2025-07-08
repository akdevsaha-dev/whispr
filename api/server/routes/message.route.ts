import express from "express"
import { getMessages, sendMessages } from "../controllers/message.controllers";
import { protectRoute } from "../middleware/protectRoute";

const router = express.Router()

router.post("/send/:id", protectRoute, sendMessages)
router.post("/:id", protectRoute, getMessages)
router.get("/group/:id", protectRoute,)
export default router;