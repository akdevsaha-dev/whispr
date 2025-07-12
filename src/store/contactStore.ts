

// type User = {
//     id: string
// }

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
    // isRemovingContact: boolean
    // isGettingContact: boolean
    // isSearchingUserByEmail: boolean
    addContact: (data: { ownerId: string, contactId: string }) => void
    // removeContact: (data: { ownerId: string, contactId: string }) => void
    // getContacts: (data: { userId: string }) => void
    // searchUserByEmail: (data: { email: string }) => void
}

export const useContactStore = create<contactStore>((set) => ({
    contact: [],
    isAddingContact: false,
    addContact: async (data: { ownerId: string, contactId: string }) => {
        set({ isAddingContact: true })
        try {
            const res = await axiosInstance.post("/contacts/addContact", data)
            const newContact = res.data.contact
            set((state) => {
                const alreadyExists = state.contact.some((c) => c.id === newContact.id)
                if (alreadyExists) {
                    toast("User is already in your contact list.")
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
    }
}))