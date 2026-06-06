"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ConceptSection() {
  return (
    <section className="section-py bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <h2 className="order-1 lg:order-2 lg:col-start-2 lg:row-start-1 text-3xl sm:text-4xl font-light text-ink text-center lg:text-left mb-2 lg:mb-4 lg:-mt-2">
            Dall&apos;Agnol Odontologia
          </h2>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 lg:row-span-2 relative aspect-[3/4] min-h-[280px] sm:min-h-[320px] w-full max-w-sm mx-auto lg:mx-0 lg:ml-12 rounded-2xl overflow-hidden"
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
            className="order-3 lg:order-3 lg:col-start-2 lg:row-start-2"
          >
            <p className="text-ink-secondary text-lg leading-relaxed mb-6">
              Com 21 anos de experiência clínica, o Cirurgião-dentista Cláudio
              Dall&apos;Agnol é referência em Odontologia em Fontoura Xavier e
              tem se mostrado um dos profissionais melhor avaliados na região.
            </p>
            <p className="text-ink-secondary text-lg leading-relaxed mb-6">
              Em 2016 criou a Dall&apos;Agnol Odontologia, sonho este que o
              impulsionou desde a formação em 2005 pela Universidade Luterana
              Do Brasil. Com muito estudo, dedicação e pós-graduações em diversas
              áreas da Odontologia, o sonho de ter uma clínica que refletisse o
              compromisso com a excelência, se tornou realidade.
            </p>
            <p className="text-ink-secondary text-lg leading-relaxed">
              Hoje, realiza os atendimentos aos pacientes com alta performance
              clínica e atendimento humanizado que fazem parte da sua essência.
              Na clínica, cada sorriso é motivo de dedicação e cuidado, fruto de
              anos de trabalho e paixão pela Odontologia.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
