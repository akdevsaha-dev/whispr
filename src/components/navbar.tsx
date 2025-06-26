"use client";
import { motion } from "motion/react";
export const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, delay: 0.8 }}
      className="grid h-[70px] w-full grid-cols-12 items-end"
    >
      <div className="col-span-3 pl-16 font-sans text-4xl font-bold">
        whisper{" "}
      </div>
      <div className="col-span-9">
        <div className="mr-12 ml-[25vw] flex justify-end gap-6 text-sm">
          {["Home", "Features", "Pricing", "Contact"].map((item) => (
            <div
              key={item}
              className="cursor-pointer rounded-[12px] px-4 py-2 delay-100 hover:bg-[#EDEBE6]"
            >
              {item}
            </div>
          ))}
          <div className="rounded-[12px] bg-[#EDEBE6] px-5 py-2">
            Get Started
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
