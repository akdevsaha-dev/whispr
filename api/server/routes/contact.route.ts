import express from "express"
import { addContact, getContacts, removeContact, searchUserByEmail } from "../controllers/contact.controllers";

const router = express.Router()

router.post("/addContact", addContact)
router.delete("/removeContact", removeContact)
router.get("/search", searchUserByEmail)
router.get("/:userId", getContacts)
export default router;