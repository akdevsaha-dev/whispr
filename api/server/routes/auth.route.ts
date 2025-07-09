import express from "express"
import { checkAuth, logout, signin, signup, updateProfile } from "../controllers/auth.controllers"
import { protectRoute } from "../middleware/protectRoute"


const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/logout", protectRoute, logout)
router.post("/updatepfp", protectRoute, updateProfile)
router.get("/checkAuth", protectRoute, checkAuth)
export default router;  