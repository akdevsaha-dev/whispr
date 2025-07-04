import express from "express"
import { addContact, getContacts, removeContact, searchUserByEmail } from "../controllers/contact.controllers";
import { protectRoute } from "../middleware/protectRoute";

const router = express.Router()

router.post("/addContact", protectRoute, addContact)
router.delete("/removeContact", protectRoute, removeContact)
router.get("/search", protectRoute, searchUserByEmail)
router.get("/:userId", protectRoute, getContacts)
export default router;