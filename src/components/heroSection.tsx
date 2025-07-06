"use client";
import { motion, Variants } from "motion/react";
import { Navbar } from "./navbar";
import Link from "next/link";
import { MoveRight, Zap } from "lucide-react";
import Image from "next/image";

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
              <Link href="/login" className="text-sm">
                Get started
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="h-[400px] w-[70%]"></div>
        <div className="mb-6 flex h-[250px] w-full justify-center">
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
      <div className="mt-19 flex min-h-screen w-full justify-center">
        <div className="w-[57%]">
          <div className="w-[500px]">
            <div className="tracking-none pr-4 text-[44px] leading-13 font-semibold">
              Let go of the noise. Keep the people.
            </div>
            <div className="mt-5 pr-12">
              Whispr is built for people who actually care about staying close —
              not just sending texts. We combine the speed of modern messaging
              with the warmth of real conversation, helping you stay
              effortlessly in sync with the people who matter, every day.
            </div>
            <div className="mt-5 pr-12">
              You shouldn’t have to scroll through clutter, dig through threads,
              or switch between five different platforms just to stay close.
            </div>
            <Link
              href={"/login"}
              className="mt-8 flex gap-2 hover:font-semibold"
            >
              <div>Sign up</div>
              <div>
                {" "}
                <MoveRight size={20} className="pt-[6px]" />
              </div>
            </Link>
          </div>
          <div className="h-screen w-full">
            <div className="mt-5 flex w-full flex-col gap-2">
              {/* First Row */}
              <div className="flex items-start justify-between gap-1">
                <div className="h-[270px] w-[250px]">
                  <img
                    src="/bento1.png"
                    alt="ben1"
                    className="mt-12 h-full w-full rounded-4xl object-cover"
                  />
                </div>
                <div className="h-[270px] w-[250px]">
                  <img
                    src="/bento2.png"
                    alt="ben2"
                    className="mt-20 h-full w-full rounded-4xl object-cover"
                  />
                </div>
                <div className="h-[270px] w-[250px]">
                  <img
                    src="/bent03.png"
                    alt="ben3"
                    className="mt-5 h-full w-full rounded-4xl object-cover"
                  />
                </div>
              </div>
              {/* Second Row */}
              <div className="flex items-start justify-between gap-1">
                <div className="h-[270px] w-[250px]">
                  <img
                    src="/bento1.png"
                    alt="ben1"
                    className="mt-16 h-full w-full rounded-4xl object-cover"
                  />
                </div>
                <div className="h-[270px] w-[250px]">
                  <img
                    src="/bento2.png"
                    alt="ben2"
                    className="mt-24 h-full w-full rounded-4xl object-cover"
                  />
                </div>
                <div className="h-[270px] w-[250px]">
                  <img
                    src="/bent03.png"
                    alt="ben3"
                    className="mt-10 h-full w-full rounded-4xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-h-[300vh] w-full justify-center">
        <div className="flex w-[94%] justify-center rounded-[35px] bg-[#F5F3EE]">
          <div className="w-[90%]">
            <div className="mt-20 w-[500px]">
              <div className="tracking-none pr-4 text-[44px] leading-13 font-semibold">
                Conversations that click. Instantly. Build real conversations.
              </div>
              <div className="mt-5 pr-12">
                Whispr goes beyond basic messaging—it’s an intelligent,
                real-time communication platform designed for genuine,
                uninterrupted connection. Whether you’re chatting one-on-one or
                in a group, our system ensures smooth interactions, smart
                syncing, and a UI that feels built around you.
              </div>
              <div className="mt-5 pr-12">
                Get an intuitive chat experience with features like real-time
                presence, smart typing indicators, message receipts, and
                blazing-fast delivery—so you’re never out of sync, and always in
                the moment.
              </div>
              <Link
                href={"/login"}
                className="mt-8 flex gap-2 hover:font-semibold"
              >
                <div>Sign up</div>
                <div>
                  {" "}
                  <MoveRight size={20} className="pt-[6px]" />
                </div>
              </Link>
            </div>
            <div className="relative mt-14 h-screen">
              <Image
                src={"/big1.png"}
                alt="big hero"
                height={1400}
                width={1400}
                className="h-full rounded-[35px]"
              />
              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 rounded-[14px] bg-white px-5 py-4 text-indigo-500">
                <Zap size={20} className="fill-indigo-500 pt-1" />
                <div>Excellent call</div>
              </div>
            </div>
            <div className="relative mt-24 grid h-[80vh] grid-cols-2 border-t-[1px] border-neutral-300 text-xl text-black">
              <div className="col-span-1 border-r-[1px] border-neutral-300"></div>
              <div className="col-span-1">
                <div className="mt-10 ml-10 h-[330px] w-[590px]">
                  <Image
                    src={"/twoimg.png"}
                    alt="left"
                    height={500}
                    width={400}
                    className="h-full w-full"
                  />
                </div>
                <div className="mt-10 ml-10">
                  <div className="text-2xl font-semibold">
                    Real-time conversations, zero complexity.
                  </div>
                  <div className="mt-5 text-sm text-neutral-700">
                    You don’t need to build or manage complex communication
                    infrastructure. Whispr handles the entire chat and video
                    calling experience for you — whether it’s casual,
                    professional, or collaborative.
                  </div>
                  <div className="mt-4 text-sm text-neutral-700">
                    Whispr gives you instant, real-time messaging, crystal-clear
                    video calls, and presence awareness — all in one seamless
                    platform.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
