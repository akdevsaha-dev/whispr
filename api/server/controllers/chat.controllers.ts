import { Request, Response } from "express"
import { PrismaClient } from "../../generated/prisma";
export const createChat = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    const { senderId, recieverId } = req.body;

    if (!senderId || !recieverId || senderId === recieverId) {
        return res.status(400).json({
            error: "both user id must be provided and different!"
        })
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
                            id: recieverId
                        }
                    }
                }
            },
            include: {
                participants: true
            }
        })
        if (existingChat) {
            return res.status(200).json({
                chat: existingChat
            })
        }
        const newChat = await prisma.chat.create({
            data: {
                isGroupChat: false,
                participants: {
                    connect: [{ id: senderId }, { id: recieverId }]
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

export const createGroupChat = () => {

}

export const getUserChats = () => {

}

export const getChatById = () => {

}