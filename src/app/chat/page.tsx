import { ChatComponent } from "@/components/chatComponent";
import { SideBar } from "@/components/sideBar";

export default function page() {
  return (
    <div className="flex min-h-screen w-full bg-[#F5F3EE]">
      <div className="w-[35%]">
        <SideBar />
      </div>
      <div className="w-[65%]">
        <ChatComponent />
      </div>
    </div>
  );
}
