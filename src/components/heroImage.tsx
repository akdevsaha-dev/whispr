import { motion } from "motion/react";
import Image from "next/image";

const images: string[] = [
  "/heroimg1.avif",
  "/heroimg2.avif",
  "/heroimg3.avif",
  "/heroimg4.avif",
  "/heroimg5.avif",
];

export const HeroImage = () => {
  return (
    <div className="space-y-4">
      {" "}
      {/* Optional spacing between images */}
      {images.map((src, index) => (
        <div key={index} className="relative h-[300px] w-full">
          <Image
            src={src}
            alt="image"
            className="rounded-md object-cover"
            width={200}
            height={200}
          />
        </div>
      ))}
    </div>
  );
};
