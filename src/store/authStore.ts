import { axiosInstance } from "@/lib/axios"
import { create } from "zustand"
import toast from "react-hot-toast"
import axios from "axios"

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
    checkAuth: () => void
    isCheckingAuth: boolean
    isSigningUp: boolean
    isLoggingIn: boolean
    signup: (data: { username: string, email: string, password: string }) => Promise<Boolean>
    login: (data: { email: string, password: string }) => Promise<boolean>
    // isUpdatingProfile: boolean
    logout: () => void
}

export const useAuthStore = create<authStore>((set) => ({

    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    // isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get("/auth/checkAuth");
            set({ authUser: res.data });
        } catch (error) {
            console.error("❌ Auth check failed:", error);
            set({ authUser: null });
        } finally {
            console.log("🏁 checkAuth() complete");
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data: { username: string, email: string, password: string }): Promise<boolean> => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data })
            toast.success("Account created successfully!")
            return true;
        } catch (error) {
            console.log(error)
            toast.error("Failed creating account")
            return false;
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data: { email: string, password: string }): Promise<boolean> => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/signin", data)
            set({ authUser: res.data })
            toast.success("Logged in successfully!")
            return true;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Something went wrong";
                toast.error(message); // 🔥 shows your backend message in a toast
            } else {
                toast.error("Unexpected error");
            }
            return false;
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