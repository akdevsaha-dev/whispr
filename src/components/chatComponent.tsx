import { Menu, Phone, Send, Video } from "lucide-react";

export const ChatComponent = () => {
  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="relative flex h-screen w-[93%] flex-col overflow-hidden">
        {/* user navbar */}
        <div className="sticky z-10 mt-4 grid h-16 w-full grid-cols-6 rounded-xl bg-white shadow-lg shadow-neutral-200">
          <div className="col-span-2 flex items-center gap-5">
            <div className="ml-4 h-12 w-12 rounded-full bg-black"></div>
            <div>Akdev Saha</div>
          </div>
          <div className="col-span-4 mr-10 flex items-center  justify-end gap-6">
            <Phone color="gray" size={20} className="" />
            <Video color="gray" size={22} />
            <Menu color="gray" size={21} />
          </div>
        </div>
        <div className="mt-2 w-full flex-1 overflow-y-auto"></div>
        <div className="mb-5 flex h-20 w-full items-center gap-2">
          <input
            className="w-full rounded-2xl border-[1px] border-neutral-400 px-4 py-3 outline-0"
            placeholder="Message..."
          />
          <div className="rounded-xl bg-neutral-300 px-4 py-4">
            <Send size={25} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};
