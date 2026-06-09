"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DR_CLAUDIO_CRO } from "@/lib/constants";

export function ConceptSection() {
  return (
    <section className="section-py bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-x-12 lg:gap-y-3 items-start">
          <div className="order-1 lg:order-2 lg:col-start-2 lg:row-start-1 lg:-mt-2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-light text-ink">
              Dall&apos;Agnol Odontologia
            </h2>
            <p className="mt-2 text-sm font-medium tracking-wide text-primary-mid">
              Dr. Cláudio Dall&apos;Agnol · CRO {DR_CLAUDIO_CRO}
            </p>
          </div>

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
            className="order-3 lg:order-3 lg:col-start-2 lg:row-start-2 -mt-2 lg:-mt-1"
          >
            <p className="text-ink-secondary text-lg leading-relaxed mb-6">
              Com mais de 21 anos de dedicação à Odontologia, o Cirurgião-Dentista
              Dr. Cláudio Dall&apos;Agnol construiu uma trajetória pautada pela
              excelência clínica, atualização constante e cuidado genuíno com seus
              pacientes.
            </p>
            <p className="text-ink-secondary text-lg leading-relaxed mb-6">
              Em 2015, concretizou o sonho de fundar a Dall&apos;Agnol Odontologia,
              um espaço criado para oferecer atendimento de excelência, aliando
              conhecimento científico, tecnologia e acolhimento humano. Desde
              então, a clínica tem se destacado pelo compromisso com a qualidade
              dos tratamentos e pela construção de relações de confiança duradouras
              com seus pacientes.
            </p>
            <p className="text-ink-secondary text-lg leading-relaxed mb-6">
              Acreditamos que cada sorriso possui uma história única. Por isso,
              cada atendimento é realizado de forma personalizada, respeitando as
              necessidades, expectativas e objetivos de cada pessoa.
            </p>
            <p className="text-ink-secondary text-lg leading-relaxed">
              Na Dall&apos;Agnol Odontologia, excelência técnica e cuidado humano
              caminham juntos para proporcionar saúde, bem-estar e confiança
              através do sorriso.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
