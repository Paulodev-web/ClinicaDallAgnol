"use client";

import { PageHero } from "@/components/sections/PageHero";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Claudio Dall'Agnol",
    role: "Diretor Clínico",
    focus: "Responsável pelo planejamento de casos complexos e reabilitações orais.",
    description:
      "Especialista em Lentes de Contato, Implantes e Reabilitação Oral. Foco nas especializações internacionais e no papel de estrategista.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop",
  },
  {
    name: "Dra. [Especialista em Canal]",
    role: "Endodontia Avançada",
    focus: "Precisão microscópica e salvamento dental.",
    description:
      "Dedica sua carreira exclusivamente à Endodontia Avançada, utilizando tecnologia de ponta para tratamentos rápidos e indolores.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop",
  },
  {
    name: "Dra. [Especialista em Harmonização]",
    role: "Harmonização Orofacial",
    focus: "Estética Orofacial e Naturalidade.",
    description:
      "Referência em procedimentos injetáveis, focada em realçar a beleza de forma sutil e personalizada.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop",
  },
];

const methodPoints = [
  "Planejamento Compartilhado",
  "Protocolos de Segurança",
  "Atualização Científica Constante",
];

export default function EquipePage() {
  return (
    <>
      <PageHero
        title="Talento individual, excelência coletiva."
        subtitle="Um corpo clínico multidisciplinar que une especialidades complementares para um diagnóstico de alta precisão."
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80"
                alt="Equipe de dentistas"
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
              <p className="text-gray-600 text-lg leading-relaxed">
                A clínica não é &quot;o Claudio e seus ajudantes&quot;, mas um time de
                especialistas. Os casos são discutidos em conjunto, com
                interconsultas que garantem o melhor plano de tratamento para
                cada paciente.
              </p>
            </motion.div>
          </div>

          <div className="space-y-24">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-16 items-center ${
                  i % 2 === 1 ? "" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[3/4] max-w-md rounded-2xl overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-lg text-gray-300 mb-4">{member.focus}</p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
          >
            O Método Dall&apos;Agnol de Qualidade
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {methodPoints.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <p className="text-gray-300 text-lg font-medium">{point}</p>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 mt-12"
          >
            Todos os profissionais seguem o mesmo rigor e padrão de qualidade
            exigido pelo Dr. Claudio. Uma unidade de marca em cada atendimento.
          </motion.p>
        </div>
      </section>
    </>
  );
}
