"use client";

import { PageHero } from "@/components/sections/PageHero";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Conteúdos sobre saúde bucal, estética e bem-estar — em breve."
      />

      <section className="section-py bg-page">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface rounded-2xl p-12 border border-graysoft/60 shadow-brand-md"
          >
            <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-4">
              Em breve
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-ink mb-4">
              Estamos preparando conteúdos exclusivos
            </h2>
            <p className="text-ink-secondary text-lg leading-relaxed">
              Artigos sobre tratamentos, cuidados preventivos e novidades da
              clínica estarão disponíveis aqui em breve.
            </p>
          </motion.div>
        </div>
      </section>

      <FooterCTA />
    </>
  );
}
