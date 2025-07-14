"use client";
import { motion } from "motion/react";
import { forwardRef } from "react";

interface InputBoxProps {
  label: string;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputType: React.HTMLInputTypeAttribute;
}

export const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
  ({ label, placeholder, onKeyDown, onChange, inputType }, ref) => {
    return (
      <motion.div
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        className="mx-16 mt-10"
      >
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
  },
);

// It sets the name of the component for debugging tools like React DevTools and also helps with better error messages in stack traces.
InputBox.displayName = "InputBox";
