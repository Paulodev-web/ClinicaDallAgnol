"use client";

import { PageHero } from "@/components/sections/PageHero";
import { FooterCTA } from "@/components/sections/FooterCTA";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Claudio Dall'Agnol",
    role: "Diretor Clínico",
    focus: "Proprietário e Responsável Técnico",
    description:
      "É cirurgião-dentista graduado em Odontologia pela Universidade Luterana do Brasil. Pós-graduado em Cirurgia Oral, Implantodontia, Periodontia, Ortodontia e Reabilitação Oral Estética. Possui Mestrado em Odontologia na área de Clínica Odontológica. Tem como objetivo em seu trabalho devolver saúde, autoestima e qualidade de vida aos pacientes, preservando a naturalidade do sorriso e aliando performance clínica de alto padrão ao planejamento individualizado, à tecnologia digital e aos protocolos rigorosos que garantem segurança e resultados previsíveis em cada caso.",
    image: "/DrClaudio.png",
    profileHref: "/claudio",
  },
  {
    name: "Dr. Gabriel Dall Agnol Oliveira",
    role: "Cirurgião-Dentista | Endodontista",
    focus:
      "Cuidando da saúde bucal com precisão, dedicação e compromisso com o bem-estar dos pacientes.",
    description:
      "É cirurgião-dentista com atuação voltada à Endodontia, especialidade responsável pelo diagnóstico e tratamento das doenças da polpa dentária e dos tecidos ao redor das raízes.",
    image: "/Gabriel.jpg",
  },
  {
    name: "Dra. Paula",
    role: "Harmonização Orofacial e Ortodontia",
    focus: "Equilíbrio facial, rejuvenescimento e saúde do sorriso.",
    description:
      "Especialista em Harmonização Orofacial, atuando com procedimentos voltados ao equilíbrio facial, rejuvenescimento e valorização da beleza natural, sempre com foco em resultados harmônicos e personalizados. Na Ortodontia, realiza tratamentos para adultos e crianças, incluindo ortodontia preventiva, acompanhamento do desenvolvimento dentário e correção do alinhamento do sorriso, promovendo saúde, função e estética.",
    image: "/DrPaula.jpeg",
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

      <section className="section-py bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-16 items-center"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[3/4] max-w-md rounded-2xl overflow-hidden border border-graysoft/60 shadow-brand-md">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      quality={100}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <h3 className="text-2xl font-light text-ink mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-lg text-ink-secondary mb-4">{member.focus}</p>
                  <p className="text-ink-secondary leading-relaxed">
                    {member.description}
                  </p>
                  {"profileHref" in member && member.profileHref && (
                    <Link
                      href={member.profileHref}
                      className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary uppercase tracking-wide hover:gap-3 transition-all"
                    >
                      Conheça o Dr. Claudio
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-section-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-3">
              Nosso padrão
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-ink">
              O Método Dall&apos;Agnol de Qualidade
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {methodPoints.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-surface rounded-xl p-6 border border-graysoft/60 shadow-brand-sm"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <p className="text-ink text-lg font-medium">{point}</p>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-ink-secondary mt-12 text-lg"
          >
            Na Dall&apos;Agnol, cada atendimento reflete o mesmo rigor clínico,
            os mesmos protocolos e o compromisso com excelência que definem nossa
            clínica — do primeiro contato ao acompanhamento.
          </motion.p>
        </div>
      </section>

      <FooterCTA />
    </>
  );
}
