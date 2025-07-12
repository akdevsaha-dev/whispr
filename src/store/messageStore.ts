import { axiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"
import { create } from "zustand"

type Message = {
    id: string
    message: string
    senderId: string
    receiverId: string
    createdAt: string
}

type messageStore = {
    messages: Message[]
    isSendingMessage: boolean
    isGettingMessage: boolean
    sendMessage: (data: { content: string, receiverId: string }) => void
    getMessages: (userToChatId: string) => void
    clearMessage: () => void
}


export const useMessageStore = create<messageStore>((set) => ({
    messages: [],
    isSendingMessage: false,
    isGettingMessage: false,
    sendMessage: async (data: { content: string, receiverId: string }) => {
        set({ isSendingMessage: true })
        try {
            const res = await axiosInstance.post<Message>(`/messages/send`, data)
            set((state) => ({
                messages: [...state.messages, res.data]
            }))
        } catch (error) {
            console.error("error sending message", error)
            toast.error("Failed to send message.")
        } finally {
            set({ isSendingMessage: false })
        }
    },
    getMessages: async (userTochatId: string) => {
        set({ isGettingMessage: true })
        try {
            const res = await axiosInstance.get<Message[]>(`/messages/${userTochatId}`)
            set({ messages: res.data })
        } catch (error) {
            console.error("Error getting messages", error)
            toast.error("Failed to get messages.")
        } finally {
            set({ isGettingMessage: false })
        }
    },
    clearMessage: () => {
        set({ messages: [] })
    }
}))