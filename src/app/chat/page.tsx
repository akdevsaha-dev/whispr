import { UserHeadet } from "@/components/userHeader";

export default function page() {
  return (
    <div className="flex min-h-screen w-full bg-[#F5F3EE]">
      <div className="w-[35%] bg-red-500"></div>
      <div className="w-[65%]">
        <UserHeadet />
      </div>
    </div>
  );
}
