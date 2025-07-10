import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

type User = {
    id: string,
    username: string,
    email: string
}

type Message = {
    id: string
    content: string
    sender: User
    createdAt: string
}
type Chat = {
    id: string;
    isGroupChat: boolean;
    name?: string;
    participants: User[];
    messages: Message[];
    lastMessage: Message | null
}

type chatStore = {
    chats: Chat[];
    selectedChat: Chat | null
    isCreatingChat: boolean;
    isCreatingGroupChat: boolean;
    isGettingUserChats: boolean;
    // isGettingChatById: boolean;
    createChat: (data: { senderId: string, receiverId: string }) => void
    createGroupChat: (data: { userIds: string[], name: string }) => void
    getUserChats: (data: { userId: string }) => void
    // getChatById: (data: { chatId: string }) => void
    setChats: (chats: Chat[]) => void
    setSelectedChat: (chat: Chat) => void
}

export const useChatStore = create<chatStore>((set) => ({
    chats: [],
    selectedChat: null,
    isCreatingChat: false,
    isCreatingGroupChat: false,
    // isGettingChatById: false,
    isGettingUserChats: false,

    setChats: (chats: Chat[]) => set({ chats }),
    setSelectedChat: (chat: Chat | null) => set({ selectedChat: chat }),

    createChat: async (data: { senderId: string, receiverId: string }) => {
        set({ isCreatingChat: true })
        try {
            const res = await axiosInstance.post<{ chat: Chat }>("/chat/create", data)
            const newChat = res.data.chat;
            set((state) => ({
                selectedChat: newChat,
                chats: state.chats.some((c) => c.id === newChat.id) ?
                    state.chats
                    : [newChat, ...state.chats]
            }))
        } catch (error) {
            console.error("Error creating chat", error)
            toast.error("Failed to create chat!")
        } finally {
            set({ isCreatingChat: false })
        }
    },

    createGroupChat: async (data: { userIds: string[], name: string }) => {
        set({ isCreatingGroupChat: true })
        try {
            const res = await axiosInstance.post<{ chat: Chat }>("/chat/create/group", data)
            const newChat = res.data.chat
            set((state) => ({
                selectedChat: newChat,
                chats: [newChat, ...state.chats]
            }
            ))
        } catch (error) {
            console.error("Error creating group!")
            toast.error("Error creating group!")
        } finally {
            set({ isCreatingGroupChat: false })
        }
    },
    getUserChats: async (data: { userId: string }) => {
        set({ isGettingUserChats: true })
        try {
            const res = await axiosInstance.get<{ chats: Chat[] }>(`/chat/all/${data.userId}`)
            set({ chats: res.data.chats })
        } catch (error) {
            console.error("Error fetching chats")
            toast.error("Failed to fetch chats!")
        } finally {
            set({ isGettingUserChats: false })
        }
    }


}))
