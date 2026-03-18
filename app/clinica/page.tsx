"use client";

import { PageHero } from "@/components/sections/PageHero";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ClinicaPage() {
  return (
    <>
      <PageHero
        title="A excelência em cada detalhe."
        subtitle="Um ambiente projetado para oferecer o máximo rigor clínico em uma experiência de cuidado singular."
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                alt="Hall de entrada da clínica"
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                O Legado e a Visão
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Uma filosofia de cuidado que atravessa gerações.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                O compromisso do Dr. Claudio com a perfeição está impresso em
                toda a equipe e estrutura. A clínica tem uma alma e um método
                próprio, independentemente de quem execute o serviço, garantindo
                confiança na delegação e excelência em cada atendimento.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Infraestrutura e Experiência
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Privacidade e conforto em um novo patamar.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Silêncio, atendimento personalizado e privacidade das salas.
                Cada detalhe foi pensado para que você se sinta em um ambiente
                de elite, longe da sensação tradicional de consultório
                odontológico.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden order-first lg:order-last"
            >
              <Image
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80"
                alt="Sala de atendimento"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tecnologia e Inovação
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Precisão absoluta a serviço da sua saúde.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Scanner Intraoral
              </h3>
              <p className="text-gray-600">
                Captura digital precisa para planejamento e execução de
                tratamentos.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Planejamento Digital
              </h3>
              <p className="text-gray-600">
                Visualização prévia dos resultados antes de qualquer
                procedimento.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Sedação Consciente
              </h3>
              <p className="text-gray-600">
                Conforto e tranquilidade durante procedimentos mais complexos.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Rigor Clínico e Segurança
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Processos de biossegurança e normas internacionais são tratados com
              seriedade absoluta. Depois do luxo e da técnica, garantimos que a
              base — saúde e segurança — é o alicerce de tudo que fazemos.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
