import { axiosInstance } from "@/lib/axios"
import { create } from "zustand"
import { checkAuth } from "../../api/server/controllers/auth.controllers"
import toast from "react-hot-toast"

type authUser = {
    id: string,
    username: string,
    email: string,
    profilePicture: string,
    createdAt: string,
    status: string
}

type authStore = {
    authUser: authUser | null
    checkauth: () => void
    isCheckingAuth: boolean
    isSigningUp: boolean
    isLoggingIn: boolean
    signup: (data: { username: string, email: string, password: string }) => void
    login: (data: { email: string, password: string }) => void
    // isUpdatingProfile: boolean
    logout: () => void
}

export const useAuthStore = create<authStore>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    // isUpdatingProfile: false,
    isCheckingAuth: true,

    checkauth: async () => {
        set({ isCheckingAuth: true })
        try {
            const res = await axiosInstance.get("/auth/checkAuth")
            set({ authUser: res.data })
        } catch (error) {
            console.error(error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data: { username: string, email: string, password: string }) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data })
            toast.success("Account created successfully!")
        } catch (error) {
            console.log(error)
            toast.error("Failed creating account")
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data: { email: string, password: string }) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/signin", data)
            set({ authUser: res.data })
            toast.success("Logged in successfully!")
        } catch (error) {
            console.error(error)
            toast.error("Failed to login!")
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            toast.success("Logged out successfully!")
        } catch (error) {
            toast.error((error as Error).message)
        }
    }
}))