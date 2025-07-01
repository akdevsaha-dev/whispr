import express from "express"
import { logout, signin, signup } from "../controllers/auth.controllers"
import { protectRoute } from "../middleware/protectRoute"


const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/logout", protectRoute, logout)

export default router;  