
import { Request, Response } from "express"
import { PrismaClient } from "../../generated/prisma";


const prisma = new PrismaClient();
export const getMessages = async (req: Request, res: Response) => {
    try {
        const { id: userTochatId } = req.params;
        const currentUserId = (req as any).user.id;

        const chat = await prisma.chat.findFirst({
            where: {
                isGroupChat: false,
                participants: {
                    every: {
                        id: {
                            in: [currentUserId, userTochatId]
                        }
                    }
                }
            }
        })
        if (!chat) {
            res.status(404).json({ message: "Chat not found between these users." })
            return;
        }

        const messages = await prisma.message.findMany({
            where: {
                chatId: chat?.id
            },
            orderBy: {
                sentAt: "asc"
            }
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({ message: "Failed to get messages", error });
    }
}

export const sendMessages = async (req: Request, res: Response) => {
    try {
        const { content, receiverId } = req.body;
        const currentUserId = (req as any).user.id;
        let chat = await prisma.chat.findFirst({
            where: {
                isGroupChat: false,
                participants: {
                    every: {
                        id: {
                            in: [currentUserId, receiverId]
                        }
                    }
                }
            }
        })
        if (!chat) {
            chat = await prisma.chat.create({
                data: {
                    isGroupChat: false,
                    participants: {
                        connect: [
                            { id: currentUserId },
                            { id: receiverId },
                        ],
                    },
                },
            });
        }
        const newMessage = await prisma.message.create({
            data: {
                content,
                senderId: currentUserId,
                chatId: chat?.id
            }
        });
        await prisma.chat.update({
            where: { id: chat.id },
            data: { lastMessageId: newMessage.id },
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: "Failed to send message", error });
    }
}