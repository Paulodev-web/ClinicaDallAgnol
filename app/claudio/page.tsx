"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  ScanFace,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { Button } from "@/components/ui/Button";
import { DrClaudioSignature } from "@/components/ui/DrClaudioSignature";

const credentials = [
  {
    icon: GraduationCap,
    title: "Formação",
    text: "Graduado em Odontologia pela Universidade Luterana do Brasil (ULBRA).",
  },
  {
    icon: Award,
    title: "Pós-graduações",
    text: "Cirurgia Oral, Implantodontia, Periodontia, Ortodontia e Reabilitação Oral Estética.",
  },
  {
    icon: GraduationCap,
    title: "Mestrado",
    text: "Mestrado em Odontologia na área de Clínica Odontológica.",
  },
];

const expertiseAreas = [
  {
    icon: Sparkles,
    title: "Facetas e Estética Dental",
    description:
      "Transformação do sorriso com planejamento digital, visagismo e mock-up — naturalidade e harmonia facial.",
    href: "/facetas",
  },
  {
    icon: Activity,
    title: "Implantodontia",
    description:
      "Implantes, protocolo sobre implantes e carga imediata com reabilitação oral de alto padrão.",
    href: "/implantodontia",
  },
  {
    icon: Layers,
    title: "Reabilitação Oral",
    description:
      "Casos complexos conduzidos com protocolos rigorosos, tecnologia digital e acompanhamento individualizado.",
    href: "/servicos",
  },
  {
    icon: ScanFace,
    title: "Planejamento Digital",
    description:
      "Escaneamento intraoral, tomografia e simulação 3D para resultados previsíveis e seguros.",
    href: "/contato",
  },
];

const pillars = [
  "Planejamento individualizado de cada caso",
  "Tecnologia digital e protocolos de biossegurança",
  "Naturalidade do sorriso e previsibilidade clínica",
];

function SectionHeading({
  tag,
  title,
  subtitle,
}: {
  tag?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-16">
      {tag && (
        <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-3">
          {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-light text-ink mb-4">{title}</h2>
      {subtitle && (
        <p className="text-ink-secondary max-w-2xl mx-auto text-lg">{subtitle}</p>
      )}
    </div>
  );
}

export default function ClaudioPage() {
  return (
    <>
      <section className="relative min-h-[75vh] flex items-end overflow-hidden">
        <Image
          src="/DrClaudio.png"
          alt="Dr. Claudio Dall'Agnol — Diretor Clínico"
          fill
          priority
          quality={90}
          className="object-cover object-[center_20%]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/25"
          aria-hidden
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-primary-light font-medium text-xs tracking-[0.14em] uppercase mb-4">
              Diretor Clínico
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4">
              Dr. Claudio Dall&apos;Agnol
            </h1>
            <p className="text-xl text-white/85 leading-relaxed mb-8">
              Proprietário, responsável técnico e arquiteto dos sorrisos na
              Dall&apos;Agnol — unindo ciência, estética e tecnologia para
              devolver saúde, autoestima e qualidade de vida.
            </p>
            <Button href="/contato" variant="primary" size="lg">
              Agendar avaliação
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="section-py bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-graysoft/60 shadow-brand-md"
            >
              <Image
                src="/DrClaudio.png"
                alt="Dr. Claudio Dall'Agnol no consultório"
                fill
                quality={100}
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-3">
                Trajetória
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-ink mb-6">
                Excelência clínica com olhar humano
              </h2>
              <p className="text-ink-secondary text-lg leading-relaxed mb-6">
                É cirurgião-dentista com formação sólida e especializações em
                áreas que exigem precisão e visão estética. Seu objetivo em cada
                tratamento é devolver saúde, autoestima e qualidade de vida,
                preservando a naturalidade do sorriso.
              </p>
              <p className="text-ink-secondary text-lg leading-relaxed mb-6">
                Graduado em Odontologia pela Universidade Luterana do Brasil
                (ULBRA) em 2005, buscou continuamente o aprimoramento
                profissional por meio de especializações e pós-graduações em
                diversas áreas da Odontologia, consolidando uma formação ampla e
                diferenciada. É Mestre em Clínica Odontológica, Especialista em
                Implantodontia, Periodontia e Ortodontia, além de possuir
                formação complementar em Endodontia, Dentística e Reabilitação
                Oral.
              </p>
              <p className="text-ink-secondary text-lg leading-relaxed mb-8">
                Como Diretor Clínico, conduz o planejamento de casos complexos e
                reabilitações orais, aliando performance clínica de alto padrão
                ao rigor dos protocolos que garantem segurança e resultados
                previsíveis — do primeiro contato ao acompanhamento.
              </p>
              <DrClaudioSignature className="text-primary-mid" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-py bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Formação"
            title="Credenciais e especialização"
            subtitle="Uma trajetória construída em estudo contínuo e prática clínica de excelência."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {credentials.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface rounded-2xl p-8 border border-graysoft/60 shadow-brand-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary">
                  <item.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-ink mb-3">{item.title}</h3>
                <p className="text-ink-secondary leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Atuação"
            title="Áreas de destaque"
            subtitle="Tratamentos de alta complexidade conduzidos com planejamento digital e protocolo personalizado."
          />
          <div className="grid sm:grid-cols-2 gap-8">
            {expertiseAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={area.href}
                  className="group block h-full bg-surface rounded-2xl p-8 border border-graysoft/60 shadow-brand-sm hover:shadow-brand-md hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/15 transition-colors">
                    <area.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-ink mb-2 group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-ink-secondary leading-relaxed mb-4">
                    {area.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wide">
                    Saiba mais
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-3">
                Tecnologia
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-ink mb-6">
                Precisão digital em cada etapa
              </h2>
              <p className="text-ink-secondary text-lg leading-relaxed mb-8">
                O escaneamento intraoral, o planejamento 3D e os recursos de
                diagnóstico no consultório permitem visualizar o resultado antes
                do tratamento — com conforto, previsibilidade e segurança para o
                paciente.
              </p>
              <ul className="space-y-4">
                {pillars.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" strokeWidth={2} />
                    </div>
                    <p className="text-ink text-lg">{point}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-graysoft/60 shadow-brand-md"
            >
              <video
                src="/Intra-oral.MOV"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                aria-label="Dr. Claudio realizando escaneamento intraoral"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      <FooterCTA />
    </>
  );
}
