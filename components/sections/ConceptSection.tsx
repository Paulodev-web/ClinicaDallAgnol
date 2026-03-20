"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ConceptSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden max-w-sm mx-auto lg:mx-0 lg:ml-12"
          >
            <Image
              src="/ClaudioAtendendo.jpg"
              alt="Dr. Claudio Dall'Agnol atendendo paciente"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              O Conceito Dall&apos;Agnol
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              A clínica é uma extensão do rigor técnico do Dr. Claudio. Ao longo
              dos anos, evoluímos para um ecossistema multidisciplinar onde a
              excelência não é exceção — é o padrão.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Mesmo quando outro profissional executa o procedimento, o padrão de
              qualidade é o mesmo: planejamento compartilhado, protocolos
              rigorosos e resultados que refletem a filosofia de cuidado que
              atravessa toda a equipe.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
