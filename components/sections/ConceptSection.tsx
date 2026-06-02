"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ConceptSection() {
  return (
    <section className="section-py bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[3/4] min-h-[280px] sm:min-h-[320px] w-full max-w-sm mx-auto lg:mx-0 lg:ml-12 rounded-2xl overflow-hidden"
          >
            <Image
              src="/ClaudioAtendendo.jpg"
              alt="Dr. Claudio Dall'Agnol atendendo paciente"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-ink/35 to-transparent lg:hidden"
              aria-hidden
            />
            <p className="absolute inset-x-0 top-0 z-10 px-4 pt-5 text-center font-heading text-sm tracking-[var(--tracking-caps)] text-white drop-shadow-[0_1px_8px_rgba(26,42,56,0.45)] sm:pt-6 sm:text-base lg:hidden">
              O conceito Dall&apos;Agnol
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-light text-ink mb-6">
              O Conceito Dall&apos;Agnol
            </h2>
            <p className="text-ink-secondary text-lg leading-relaxed mb-6">
              Ao longo dos anos, evoluímos para um ecossistema multidisciplinar
              onde a excelência não é exceção — é o padrão. Um corpo clínico de
              especialistas complementares, cada um dedicado à sua área de
              expertise.
            </p>
            <p className="text-ink-secondary text-lg leading-relaxed">
              O que nos une é uma filosofia de cuidado institucional: planejamento
              compartilhado, protocolos rigorosos e interconsulta entre
              profissionais. Cada tratamento é conduzido por quem domina aquela
              especialidade — com a confiança de uma equipe que pensa o caso em
              conjunto.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
