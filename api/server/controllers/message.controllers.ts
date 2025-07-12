import { PrismaClient } from "@prisma/client/extension";
import { Request, Response } from "express"


const prisma = new PrismaClient();
export const getMessages = async (req: Request, res: Response) => {
    try {
        const { id: userTochatId } = req.params;
        const currentUserId = (req as any).user.id;

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: currentUserId, receiverId: userTochatId },
                    { senderId: userTochatId, receiverId: currentUserId }
                ]
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Failed to get messages", error });
    }
}

export const sendMessages = async (req: Request, res: Response) => {
    try {
        const { content, receiverId } = req.body;
        const currentUserId = (req as any).user.id;
        const newMessage = await prisma.message.create({
            data: {
                content,
                senderId: currentUserId,
                receiverId
            }
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: "Failed to send message", error });
    }
}