"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHero({ title, subtitle, className = "" }: PageHeroProps) {
  return (
    <section
      className={`py-24 bg-section-alt relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl font-light text-ink mb-6"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-ink-secondary max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
