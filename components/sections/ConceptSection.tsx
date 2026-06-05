"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ConceptSection() {
  return (
    <section className="section-py bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <h2 className="order-1 lg:order-2 lg:col-start-2 lg:row-start-1 text-3xl sm:text-4xl font-light text-ink text-center lg:text-left mb-2 lg:mb-6">
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
              Com 21 anos de experiência na odontologia, realizei meu sonho em
              2016 ao inaugurar a Dall&apos;Agnol Odontologia. Desde 2005, com
              muito esforço e dedicação, construí uma clínica que reflete meu
              compromisso com a excelência.
            </p>
            <p className="text-ink-secondary text-lg leading-relaxed">
              Pós-graduações, constante atualização e um atendimento humanizado
              fazem parte da nossa essência. Na Dall&apos;Agnol, cada sorriso é
              motivo de dedicação e cuidado, fruto de anos de trabalho e paixão
              pela odontologia.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
