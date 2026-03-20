"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=90"
          alt="Clínica odontológica"
          fill
          quality={90}
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/75" />
      </div>

      <div className="relative z-10 flex items-center justify-center px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-72 sm:w-80 md:w-96 lg:w-[28rem]"
        >
          <Image
            src="/LogoDallAgnol.png"
            alt="Dall Agnoll Odontologia"
            width={400}
            height={300}
            className="w-full h-auto"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
