"use client";
import { useAuthStore } from "@/store/authStore";
import { useContactStore } from "@/store/contactStore";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const GetContacts = () => {
  const router = useRouter();

  const authUser = useAuthStore((state) => state.authUser);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  const contact = useContactStore((state) => state.contact);
  const getContacts = useContactStore((state) => state.getContacts);
  const isGettingContact = useContactStore((state) => state.isGettingContact);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const runAuth = async () => {
      try {
        await checkAuth();
      } catch (err) {
        console.error("💥 Error in async checkAuth:", err);
      }
    };
    runAuth();
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && !authUser) {
      toast.error("Please signup first.");
      router.push("/signup");
    }
  }, [isCheckingAuth, authUser]);

  useEffect(() => {
    if (authUser?.id) {
      getContacts({ userId: authUser.id });
    }
  }, [authUser]);

  if (isCheckingAuth || isGettingContact) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F5F3EE]">
        <Loader className="h-10 w-10 animate-spin text-neutral-700" />
      </div>
    );
  }

  const filteredContacts = contact.filter((c) =>
    c.contact.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#F5F3EE]">
      <div className="h-[80%] w-[60%] rounded-3xl bg-[black]/10 shadow-lg">
        <div className="pt-6 pl-6 text-2xl font-bold text-neutral-700">
          My Contacts
        </div>

        {/* Search Input */}
        <div className="mt-4 flex h-14 w-full justify-center">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline:none h-12 w-[95%] rounded-lg border border-neutral-500 px-4 focus:border-cyan-800 focus:outline-none"
          />
        </div>

        {/* Header Row */}
        <div className="mt-3 flex h-12 w-full justify-center">
          <div className="flex w-[95%] items-center rounded-lg bg-[#c9c7c1] pl-2">
            <div className="rounded-lg bg-[#282726] px-12 py-2 text-white">
              All contacts
            </div>
          </div>
        </div>

        {/* Contacts List */}
        <div className="mt-4 max-h-[50%] overflow-y-auto px-6">
          {filteredContacts.length === 0 ? (
            <div className="text-center text-neutral-600">
              No contacts found.
            </div>
          ) : (
            filteredContacts.map((c) => (
              <div
                key={c.id}
                className="mb-2 flex items-center justify-between rounded-md px-3 py-5 hover:bg-[#c9c7c1]"
              >
                <div className="font-medium text-neutral-800">
                  {c.contact.username}
                </div>
                <div className="text-sm text-neutral-500">
                  {c.contact.profilePicture}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
