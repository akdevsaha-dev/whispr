

type User = {
    id: string
    username: string
    email: string
    profilePicture: string | null
}

import { axiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"
import { create } from "zustand"

type Contact = {
    id: string
    ownerId: string
    contactId: string
    addedAt: string
    contact: {
        id: string
        username: string
        profilePicture: string
    }
}

type contactStore = {
    contact: Contact[]
    isAddingContact: boolean
    isRemovingContact: boolean
    isGettingContact: boolean
    isSearchingUserByEmail: boolean
    searchedUser: User | null
    addContact: (data: { ownerId: string, contactId: string }) => void
    removeContact: (data: { ownerId: string, contactId: string }) => void
    getContacts: (data: { userId: string }) => void
    searchUserByEmail: (data: { email: string }) => void
    resetSearch: () => void
}

export const useContactStore = create<contactStore>((set) => ({
    contact: [],
    searchedUser: null,
    isAddingContact: false,
    isRemovingContact: false,
    isGettingContact: false,
    isSearchingUserByEmail: false,

    addContact: async (data: { ownerId: string, contactId: string }) => {
        set({ isAddingContact: true })
        try {
            const res = await axiosInstance.post<{ contact: Contact }>("/contacts/addContact", data)
            const newContact = res.data.contact
            set((state) => {
                const alreadyExists = state.contact.some((c) => c.id === newContact.id)
                if (alreadyExists) {
                    toast.error("User is already in your contact list.")
                    return { contact: state.contact }
                }
                toast.success("Contact added!")
                return { contact: [newContact, ...state.contact] }
            })
        } catch (error) {
            console.log("Error adding user.", error)
            toast.error("Error adding user.")
        } finally {
            set({ isAddingContact: false })
        }
    },

    removeContact: async (data: { ownerId: string, contactId: string }) => {
        set({ isRemovingContact: true })
        try {
            await axiosInstance.delete("/contacts/removeContact", {
                data: { ownerId: data.ownerId, contactId: data.contactId },
            });
            set((state) => ({
                contact: state.contact.filter((c) => !(c.ownerId === data.ownerId && c.contactId === data.contactId))
            }))
            toast.success("removed contact successfully!")
        } catch (error) {
            console.log("Error removing contact.", error)
            toast.error("Something went wrong.")
        } finally {
            set({ isRemovingContact: false })
        }
    },

    getContacts: async (data: { userId: string }) => {
        set({ isGettingContact: true })
        try {
            const res = await axiosInstance.get(`/contacts/${data.userId}`)
            set({ contact: res.data.allContacts })
        } catch (error) {
            console.error("Error getting contacts.", error)
            toast.error("Error getting contacts.")
        } finally {
            set({ isGettingContact: false })
        }
    },
    searchUserByEmail: async (data: { email: string }) => {
        set({ isSearchingUserByEmail: true, searchedUser: null })
        try {
            const res = await axiosInstance.get("/contacts/search", {
                params: {
                    email: data.email
                }
            })
            set({ searchedUser: res.data.user })
        } catch (error) {
            console.error("Error seaching user.", error)
            toast.error("Error searching user")
        } finally {
            set({ isSearchingUserByEmail: false })
        }
    },

    resetSearch: () => {
        set({ searchedUser: null })
    }
}))