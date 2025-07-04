"use client";
import { motion } from "motion/react";
export const InputBox = ({
  label,
  placeholder,
  onKeyDown,
  onChange,
  inputType,
}: {
  label: string;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputType: React.HTMLInputTypeAttribute;
}) => {
  return (
    <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className="mx-16 mt-10">
      <div className="">{label}</div>
      <input
        className="mt-3 w-[38vw] rounded-[12px] border-[1px] border-neutral-200 bg-white px-3 py-[16px] text-sm font-thin focus:border-blue-700 focus:outline-none"
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={onChange}
        type={inputType}
      />
    </motion.div>
  );
};
