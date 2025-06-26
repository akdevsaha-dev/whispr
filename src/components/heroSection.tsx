"use client";
import { motion, Variants } from "motion/react";
import { Navbar } from "./navbar";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { HeroImage } from "./heroImage";

const headingText = "Stay connected without trying hard.";
const words = headingText.split(" ");

const paragraphText =
  "Stay in sync with your people, everyday because being social should feel natural and not like a show.";
const paraWords = paragraphText.split(" ");
// Define variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2, // optional: small delay before start
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};
const paraContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.03,
    },
  },
};

const paraWordVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};
export const HeroSection = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col items-center bg-[#F5F3EE]">
        <Navbar />
        <div className="w-[55%] pt-[12vh]">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="px-12 text-center text-[72px] leading-none font-semibold tracking-tight antialiased"
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={paraContainerVariants}
            className="px-32 pt-6 text-center text-lg"
          >
            {paraWords.map((word, index) => (
              <motion.span
                variants={paraWordVariants}
                className="mr-1 inline-block"
                key={index}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
          <div className="mt-10 flex h-[80px] items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="flex cursor-pointer items-center gap-5 rounded-[16px] bg-white px-9 py-[16px]"
            >
              <div className="rounded-[10px] bg-black px-2 py-[4px]">
                <MoveRight color="white" width={13} />
              </div>
              <Link href="/" className="text-sm">
                Get started
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="h-[400px] w-[70%]"></div>
        <div className="mb-10 flex h-[250px] w-full justify-center">
          <div className="grid w-[55%] grid-cols-2">
            <div className="col-span-1 border-r-[1px] border-r-neutral-200 px-12 py-10">
              <div className="text-2xl font-semibold antialiased">
                Don’t just message. Make it matter.
              </div>
              <div className="pt-4 text-sm">
                Whispr isn’t just another chat app. It’s where real
                conversations live—smooth, fast, and distraction-free. Built for
                people who value connection over chaos.
              </div>
            </div>
            <div className="col-span-1 px-10 py-10">
              <div className="text-2xl font-semibold antialiased">
                Less noise. More signal. All just for you.
              </div>
              <div className="pt-4 text-sm">
                No more ping fatigue. Whispr filters the fluff and keeps your
                chats clean, smart, and human. It’s messaging that respects your
                time—and your energy.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen w-full justify-center">
        <div className="w-[73%]"> </div>
      </div>
    </div>
  );
};
