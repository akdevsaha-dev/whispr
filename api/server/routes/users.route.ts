import express from "express"
import { setLastseen, setStatus } from "../controllers/users.controllers";
import { protectRoute } from "../middleware/protectRoute";
const router = express.Router()

router.patch("/status", protectRoute, setStatus)
router.patch("/lastseen", protectRoute, setLastseen)

export default router;