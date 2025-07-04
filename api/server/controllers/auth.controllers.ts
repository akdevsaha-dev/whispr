import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/index.utils";
import { PrismaClient } from "../../generated/prisma";
import cloudinary from "../config/cloudinary";


export const signup = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    const { username, email, password } = req.body;
    try {
        if (password.length < 6) {
            res.json({
                message: "Password must be at least 6 characters"
            });
            return;
        }
        const SALT_ROUNDS = 10;
        const hasedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const existingUser = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if (!existingUser) {
            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    passwordHash: hasedPassword
                }
            })
            if (user) {
                generateToken(user.id, res)
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        status: 'online'
                    }
                })
                res.status(200).json({
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    profilePicture: user.profilePicture,
                })
                return;
            } else {
                res.status(400).json({
                    message: "Invalid user data"
                })
            }
            return;
        } else {
            res.json({
                message: "User already exists!"
            })
            return;
        }
    } catch (error) {
        console.error(error)
        console.log("Error in signup controller")
        res.status(500).json({
            message: "Internal server error"
        })
        return;
    }
}


export const signin = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()

    try {

        const { email, password } = req.body
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            res.status(500).json({
                message: "User deos not exist, please create an account!"
            })
            return;
        }

        const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)

        if (!isCorrectPassword) {
            res.status(500).json({
                message: "Incorrect Password!"
            })
            return;
        }
        generateToken(user.id, res)
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                status: 'online'
            }
        })
        res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
            profilePicture: user.profilePicture,
            status: user.status
        })
        return;
    } catch (error) {
        console.error(error)
        console.log("Error in signin controller")
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const logout = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    try {
        const userId = (req as any).user;
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                status: "offline"
            }
        })
        res.cookie("jwt", "", {
            maxAge: 0,
            httpOnly: true
        })
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error)
        console.log("Error in logout controller")
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    try {
        const { profilePicture } = req.body;
        const userId = (req as any).user;
        if (!profilePicture) {
            res.status(400).json({
                message: "Profile picture is required"
            })
        }
        const pictureResponse = await cloudinary.uploader.upload(profilePicture)
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                profilePicture: pictureResponse.secure_url
            }
        })
        if (!updatedUser) {
            res.status(400).json({
                message: "Error while updating profile picture!"
            })
            return;
        }
        res.status(200).json({
            message: "Profile picture updated successfully",
            user: updatedUser
        })
        return;
    } catch (error) {
        console.error(error);
        console.log("error in the updateProfile controller")
        res.status(500).json({
            message: "Error updating profile",
        });
        return;
    }
}