"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ScanFace,
  Layers,
  Sparkles,
  ShieldCheck,
  Eye,
  Palette,
  Clock,
  Check,
} from "lucide-react";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { Button } from "@/components/ui/Button";

const benefits = [
  {
    icon: Sparkles,
    title: "Naturalidade",
    description:
      "Cor, forma e translucidez pensadas para integrar-se ao seu rosto — nunca parecer artificial.",
  },
  {
    icon: ScanFace,
    title: "Visagismo",
    description:
      "Análise facial completa para harmonizar o sorriso com traços, proporções e personalidade.",
  },
  {
    icon: Layers,
    title: "Mínima invasão",
    description:
      "Preparo conservador do dente, preservando ao máximo a estrutura natural sempre que possível.",
  },
  {
    icon: ShieldCheck,
    title: "Durabilidade",
    description:
      "Materiais de alta performance e acabamento refinado para resultados que permanecem ao longo dos anos.",
  },
];

const steps = [
  {
    number: "01",
    title: "Avaliação e diagnóstico",
    description:
      "Consulta detalhada com exames clínicos e registros fotográficos. Entendemos suas expectativas e avaliamos a saúde bucal antes de qualquer procedimento.",
  },
  {
    number: "02",
    title: "Planejamento digital",
    description:
      "Mock-up e simulação do resultado final. Você visualiza o novo sorriso antes mesmo de iniciar o tratamento — sem surpresas.",
  },
  {
    number: "03",
    title: "Confecção e aplicação",
    description:
      "Facetas confeccionadas com precisão milimétrica e cimentadas com protocolos rigorosos de adesão e isolamento.",
  },
  {
    number: "04",
    title: "Acompanhamento",
    description:
      "Revisões periódicas e orientações personalizadas de cuidado para manter a estética e a saúde do sorriso.",
  },
];

const differentials = [
  {
    icon: Eye,
    title: "Mock-up digital",
    description: "Visualize o resultado antes de começar.",
  },
  {
    icon: Palette,
    title: "Personalização total",
    description: "Cada faceta é desenhada para o seu rosto.",
  },
  {
    icon: Clock,
    title: "Protocolo eficiente",
    description: "Etapas organizadas para conforto e previsibilidade.",
  },
];

const faqItems = [
  {
    q: "O que são facetas dentárias?",
    a: "São lâminas finas de porcelana ou resina aplicadas sobre a face frontal dos dentes. Corrigem forma, cor, tamanho e pequenos desalinhamentos com resultado estético natural.",
  },
  {
    q: "Qual a diferença entre facetas e lentes de contato?",
    a: "Na prática clínica, o termo é frequentemente usado de forma intercambiável. Ambas são lâminas ultrafinas; a escolha do material e da espessura depende do caso e é definida no planejamento.",
  },
  {
    q: "Quanto tempo dura o tratamento?",
    a: "Varia conforme a complexidade. Após a avaliação inicial e o planejamento, o protocolo completo costuma ser concluído em poucas consultas, com etapas bem definidas.",
  },
  {
    q: "As facetas duram quanto tempo?",
    a: "Com higiene adequada, revisões periódicas e cuidados orientados pela equipe, as facetas podem durar muitos anos. Hábitos como bruxismo devem ser avaliados previamente.",
  },
  {
    q: "O procedimento dói?",
    a: "O preparo é mínimo e realizado com anestesia local quando necessário. A maioria dos pacientes relata conforto durante e após as sessões.",
  },
  {
    q: "Como agendar uma avaliação?",
    a: "Entre em contato pelo formulário ou WhatsApp. Nossa equipe direciona seu caso ao especialista em estética dental para a primeira consulta.",
  },
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

export default function FacetasPage() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src="/Foto_Faceta.jpeg"
          alt="Resultado de tratamento com facetas dentárias"
          fill
          priority
          quality={90}
          className="object-cover object-[center_50%]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/20"
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
              Estética dental de excelência
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
              Facetas
            </h1>
            <p className="text-xl text-white/85 leading-relaxed mb-8">
              A união entre a ciência da saúde e a arte do sorriso. Transformação
              com precisão, naturalidade e planejamento personalizado.
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
            >
              <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-3">
                O tratamento
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-ink mb-6">
                Um sorriso pensado para você
              </h2>
              <p className="text-ink-secondary text-lg leading-relaxed mb-6">
                As facetas dentárias são a solução mais refinada para quem busca
                transformar o sorriso sem comprometer a naturalidade. Lâminas
                ultrafinas de porcelana corrigem imperfeições de cor, forma e
                proporção com acabamento que imita a translucidez do dente natural.
              </p>
              <p className="text-ink-secondary text-lg leading-relaxed">
                Na Dall&apos;Agnol, cada caso é conduzido pelo Dr. Claudio — especialista
                em lentes de contato e reabilitação oral — com planejamento
                digital, visagismo e mock-up para que você aprove o resultado
                antes de qualquer intervenção.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[960/1095] max-w-md ml-auto w-full rounded-2xl overflow-hidden border border-graysoft/60 shadow-brand-md bg-black"
            >
              <Image
                src="/Zete.png"
                alt="Zete"
                fill
                quality={90}
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 448px"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-py bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Por que escolher"
            title="Benefícios das facetas"
            subtitle="Resultados que vão além da estética — função, harmonia e confiança."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-surface rounded-2xl p-6 border border-graysoft/60 shadow-brand-sm hover:shadow-brand-md hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <item.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-ink mb-2">{item.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Passo a passo"
            title="Como funciona o tratamento"
            subtitle="Um protocolo claro, transparente e centrado no paciente."
          />
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 bg-surface rounded-2xl p-8 border border-graysoft/60 shadow-brand-sm"
              >
                <span className="text-3xl font-light text-primary/40 shrink-0">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-xl font-medium text-ink mb-3">{step.title}</h3>
                  <p className="text-ink-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
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
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-graysoft/60 shadow-brand-md order-2 lg:order-1"
            >
              <video
                src="/digital.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                aria-label="Escaneamento digital para planejamento de facetas"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-3">
                Método Dall&apos;Agnol
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-ink mb-6">
                Tecnologia a serviço da estética e reabilitação oral
              </h2>
              <p className="text-ink-secondary text-lg leading-relaxed mb-8">
                Combinamos escaneamento intraoral, planejamento digital e
                visagismo para que cada faceta seja única — desenhada para
                harmonizar com seu rosto, não apenas com seus dentes.
              </p>
              <ul className="space-y-4">
                {differentials.map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-medium text-ink">{item.title}</p>
                      <p className="text-ink-secondary text-sm">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-py bg-page">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading tag="Dúvidas frequentes" title="Perguntas sobre facetas" />
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-surface rounded-xl p-6 border border-graysoft/60 shadow-brand-sm"
              >
                <h4 className="font-medium text-ink mb-2">{item.q}</h4>
                <p className="text-ink-secondary">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-section-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
              <Check className="w-7 h-7 text-primary" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-ink mb-6">
              Pronto para conhecer seu novo sorriso?
            </h2>
            <p className="text-ink-secondary text-lg mb-8 max-w-2xl mx-auto">
              Agende uma avaliação com o Dr. Claudio e descubra como as facetas
              podem transformar sua autoestima com naturalidade e precisão.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contato" variant="primary" size="lg">
                Solicitar avaliação
              </Button>
              <Button href="/servicos" variant="outline" size="lg">
                Ver outros serviços
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterCTA />
    </>
  );
}
