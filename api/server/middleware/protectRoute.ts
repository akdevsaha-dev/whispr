import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

interface JwtPaylaod {
    userId: string
}
export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient()
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({
                message: "Unauthorized"
            })
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPaylaod
        if (!decoded) {
            res.status(401).json({
                message: "Unauthorized-invalid token"
            })
            return;
        }
        const user = await prisma.user.findFirst({
            where: {
                id: decoded.userId
            }
        })
        if (!user) {
            res.status(401).json({ message: "Unauthorized - user not found" });
            return
        }
        //@ts-ignore
        req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            createdAt: user.createdAt
        }
        next();
    } catch (error) {
        console.error(error)
        console.log("error in middleware")
        res.json(
            {
                message: "middleware error"
            }
        )
    }
}