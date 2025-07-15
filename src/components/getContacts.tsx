"use client";
import { useAuthStore } from "@/store/authStore";
import { useContactStore } from "@/store/contactStore";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const GetContacts = () => {
  console.log("🔁 Page mounted");
  const router = useRouter();

  const authUser = useAuthStore((state) => state.authUser);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  console.log("checkAuth function:", checkAuth);
  useEffect(() => {
    console.log("🔍 useEffect running checkAuth");

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

  const contact = useContactStore((state) => state.contact);
  const getContacts = useContactStore((state) => state.getContacts);
  const isGettingContact = useContactStore((state) => state.isGettingContact);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = authUser?.id;

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#F5F3EE]">
      {isCheckingAuth ? (
        <Loader />
      ) : (
        <div className="h-[80%] w-[60%] rounded-3xl bg-[black]/10">
          <div className="pt-6 pl-6 text-2xl font-bold text-neutral-700">
            My Contacts
          </div>
          <div className="h-14 w-full bg-amber-900">
            <input type="text" placeholder="Search contacts..." />
          </div>
        </div>
      )}
    </div>
  );
};
