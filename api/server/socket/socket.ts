import { Server } from "socket.io"
import { PrismaClient } from "../../generated/prisma";
import jwt, { JwtPayload } from "jsonwebtoken"
let io: Server;

const prisma = new PrismaClient();
export const initSocket = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "DELETE", "PATCH"]
        }
    });
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("Unauthorized- no token"))
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
            socket.data.userId = decoded.userId;
            next();
        } catch (error) {
            console.error("Socket auth failed:", error)
            return next(new Error("Unauthorized- invalid token"))
        }
    });

    io.on("connection", async (socket) => {
        const userId = socket.data.userId;
        console.log(`Socket connected: ${socket.id} (userId: ${userId})`)
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                status: 'online'
            }
        })
        socket.broadcast.emit("user-status-updated", {
            userId,
            status: "online"
        })
        socket.on("joinChat", ({ chatId }) => {
            socket.join(chatId);
            console.log(`User ${userId} joined chat ${chatId}`);
        });
        socket.on("typing", ({ chatId }) => {
            socket.to(chatId).emit("userTyping", {
                userId,
                chatId
            })
        })
        socket.on("stopTyping", ({ chatId }) => {
            socket.to(chatId).emit("userStoppedTyping", {
                userId,
                chatId
            })
        })
        // Handle Disconnect
        socket.on("disconnect", async () => {
            console.log(`Socket disconnected: ${socket.id} (userId: ${userId})`)
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    status: 'offline',
                    lastSeen: new Date()
                }
            })
            socket.broadcast.emit("user-status-updated", {
                userId,
                status: "offline"
            })
        })
    })
    return io;
};

export const getIO = () => {
    if (!io) throw new Error("Socket.IO not initialized");
    return io;
};