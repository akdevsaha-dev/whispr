import express from "express"
import { setLastseen, setStatus } from "../controllers/users.controllers";
const router = express.Router()

router.patch("/status", setStatus)
router.patch("/lastseen", setLastseen)

export default router;