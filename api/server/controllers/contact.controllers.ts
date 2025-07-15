import { Request, Response } from "express"
import { PrismaClient } from "../../generated/prisma"

const prisma = new PrismaClient()
export const addContact = async (req: Request, res: Response) => {
    const { ownerId, contactId } = req.body;
    if (!ownerId || !contactId) {
        res.status(200).json({
            error: "ERROR."
        })
        return;
    }
    try {
        const contact = await prisma.contact.create({
            data: {
                ownerId,
                contactId,
            }
        })
        res.status(201).json({ contact })
    } catch (error) {
        res.status(500).json({
            error: "Failed to add contact"
        })
    }
}

export const removeContact = async (req: Request, res: Response) => {
    const { ownerId, contactId } = req.body;
    if (!ownerId || !contactId) {
        res.status(200).json({
            error: "ERROR."
        })
        return;
    }
    try {
        await prisma.contact.delete({
            where: {
                ownerId_contactId: {
                    ownerId,
                    contactId,
                },
            },
        });
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: "Failed to remove contact" });
    }
}

export const getContacts = async (req: Request, res: Response) => {
    try {
        const allContacts = await prisma.contact.findMany({
            where: {
                ownerId: req.params.userId
            },
            include: {
                contact: {
                    select: {
                        id: true,
                        username: true,
                        profilePicture: true
                    }
                }
            }
        })
        res.json({ allContacts })
    } catch (error) {
        res.status(500).json({
            error: "Could not get contacts"
        })
    }
}

export const searchUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.query;
    try {
        if (typeof email !== "string" || !email.trim()) {
            res.status(400).json({
                error: "Invalid Email"
            })
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                username: true,
                email: true,
                profilePicture: true
            }
        })
        if (!user) {
            res.status(404).json({
                error: "User not found"
            })
            return;
        }
        res.json({ user })
    } catch (error) {
        res.status(500).json({
            error: "Search failed"
        })
    }
}