import { Request, Response } from "express"
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient()

export const createChat = async (req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;
    if (!senderId || !receiverId || senderId === receiverId) {
        res.status(400).json({
            error: "both user id must be provided and different!"
        })
        return;
    }
    try {
        const existingChat = await prisma.chat.findFirst({
            where: {
                isGroupChat: false,
                participants: {
                    some: {
                        id: senderId
                    }
                },
                AND: {
                    participants: {
                        some: {
                            id: receiverId
                        }
                    }
                }
            },
            include: {
                participants: true
            }
        })
        if (existingChat) {
            res.status(200).json({
                chat: existingChat
            })
            return;
        }
        const newChat = await prisma.chat.create({
            data: {
                isGroupChat: false,
                participants: {
                    connect: [{ id: senderId }, { id: receiverId }]
                }
            },
            include: {
                participants: true
            }
        })
        res.status(201).json({
            chat: newChat
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({
            error: "Failed to create chat!"
        })
    }
}

export const createGroupChat = async (req: Request, res: Response) => {
    try {
        const { userIds, name } = req.body;
        if (!userIds || !name || userIds.length < 3) {
            res.status(400).json({
                error: "Gorup chat must contain a name and atleast 3 members."
            })
            return
        }
        const chat = await prisma.chat.create({
            data: {
                isGroupChat: true,
                name,
                participants: {
                    connect: userIds.map((id: string) => ({ id }))
                },
            },
            include: {
                participants: true
            },
        })
        res.status(201).json({ chat })
    } catch (error) {
        res.status(500).json({
            error: "Failed to create group chat."
        })
    }
}

export const getUserChats = async (req: Request, res: Response) => {
    try {
        const chats = await prisma.chat.findMany({
            where: {
                participants: {
                    some: {
                        id: req.params.userId
                    }
                }
            },
            include: {
                participants: true,
                lastMessage: true
            }
        })
        res.json({ chats })
    } catch (error) {
        res.status(500).json({
            error: "Failed to get chats"
        })
    }
}

export const getChatById = async (req: Request, res: Response) => {
    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.chatId
            },
            include: {
                participants: true,
                lastMessage: true
            }
        })
        res.json({ chat })
    } catch (error) {
        console.error(error)
        res.status(404).json({ error: "Chat not found" });
    }
}