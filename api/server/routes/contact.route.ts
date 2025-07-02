import express from "express"
import { addContact, getContacts, removeContact } from "../controllers/contact.controllers";

const router = express.Router()

router.post("/addContact", addContact)
router.delete("/removeContact", removeContact)
router.get("/:userId", getContacts)
export default router;