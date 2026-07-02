"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  Smile,
  Brush,
  CalendarCheck,
  HeartPulse,
  Scan,
  Layers,
  Check,
  Droplets,
  Target,
} from "lucide-react";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { Button } from "@/components/ui/Button";

const treatments = [
  {
    icon: Droplets,
    title: "Prevenção e profilaxia",
    description:
      "Limpeza profissional, orientação de higiene e controle de biofilme para manter gengivas saudáveis e evitar o avanço de doenças periodontais.",
  },
  {
    icon: Activity,
    title: "Gengivite e periodontite",
    description:
      "Diagnóstico e tratamento de inflamações gengivais e infecções nos tecidos de suporte — sangramento, retração e mobilidade dentária.",
  },
  {
    icon: Layers,
    title: "Raspagem e alisamento",
    description:
      "Remoção de tártaro e placa bacteriana abaixo da linha gengival, com alisamento radicular para promover a reanexação dos tecidos.",
  },
  {
    icon: Target,
    title: "Cirurgia periodontal",
    description:
      "Procedimentos para casos avançados: enxertos gengivais, correção de bolsas periodontais e regeneração de tecidos quando indicado.",
  },
];

const benefits = [
  {
    icon: HeartPulse,
    title: "Gengivas saudáveis",
    description:
      "Elimine sangramento, inchaço e sensibilidade gengival — base fundamental para um sorriso estável e confortável.",
  },
  {
    icon: ShieldCheck,
    title: "Prevenção da perda dentária",
    description:
      "Tratar a periodontite cedo preserva o osso e os ligamentos que sustentam os dentes, evitando extrações futuras.",
  },
  {
    icon: Smile,
    title: "Estética do sorriso",
    description:
      "Gengivas harmoniosas em contorno e cor valorizam os dentes e contribuem para um sorriso mais jovem e equilibrado.",
  },
  {
    icon: Scan,
    title: "Base para outros tratamentos",
    description:
      "Implantes, facetas e ortodontia exigem gengiva saudável. A periodontia prepara e mantém o sorriso para resultados duradouros.",
  },
];

const steps = [
  {
    number: "01",
    title: "Avaliação periodontal",
    description:
      "Exame clínico completo com histórico de saúde, inspeção visual das gengivas, radiografias quando necessário e avaliação de fatores de risco como tabagismo e diabetes.",
  },
  {
    number: "02",
    title: "Diagnóstico e sondagem",
    description:
      "Medição das bolsas gengivais, registro de sangramento e mobilidade dentária. Com isso, definimos o estágio da doença e o plano terapêutico mais adequado.",
  },
  {
    number: "03",
    title: "Terapia clínica ou cirúrgica",
    description:
      "Raspagem supra e subgengival, alisamento radicular e, nos casos indicados, cirurgia periodontal ou enxertos — sempre com conforto e protocolos rigorosos.",
  },
  {
    number: "04",
    title: "Manutenção preventiva",
    description:
      "Consultas de suporte periódicas para controlar biofilme, monitorar a gengiva e garantir que o tratamento se mantenha estável ao longo do tempo.",
  },
];

const differentials = [
  {
    icon: Scan,
    title: "Diagnóstico preciso",
    description: "Sondagem, exames e acompanhamento clínico detalhado.",
  },
  {
    icon: Layers,
    title: "Instrumental especializado",
    description: "Equipamentos dedicados à saúde periodontal.",
  },
  {
    icon: ShieldCheck,
    title: "Biossegurança",
    description: "Ambiente controlado e protocolos de esterilização.",
  },
];

const maintenanceItems = [
  {
    icon: CalendarCheck,
    title: "Consultas de suporte",
    description:
      "Retornos programados — geralmente a cada três ou seis meses — para profilaxia periodontal e monitoramento das gengivas após o tratamento ativo.",
  },
  {
    icon: Brush,
    title: "Higiene orientada",
    description:
      "Técnicas personalizadas de escovação, fio dental e escovas interdentais para regiões de difícil acesso e manutenção em casa.",
  },
  {
    icon: HeartPulse,
    title: "Controle de fatores de risco",
    description:
      "Acompanhamento de tabagismo, diabetes e outros fatores que influenciam a saúde gengival, com orientações práticas para cada paciente.",
  },
  {
    icon: Activity,
    title: "Estabilidade a longo prazo",
    description:
      "Reavaliação periódica de bolsas gengivais e tecidos de suporte para detectar recidivas precocemente e intervir antes que o problema avance.",
  },
];

const faqItems = [
  {
    q: "O que é periodontia?",
    a: "É a especialidade odontológica dedicada à saúde das gengivas, ligamentos e osso que sustentam os dentes. Trata desde a gengivite — inflamação inicial — até a periodontite, doença mais avançada que pode levar à perda dentária.",
  },
  {
    q: "Quais são os sinais de problemas gengivais?",
    a: "Sangramento ao escovar ou usar fio dental, gengivas vermelhas ou inchadas, mau hálito persistente, retração gengival, sensibilidade na gengiva e, em estágios avançados, mobilidade dos dentes. Qualquer um desses sinais merece avaliação.",
  },
  {
    q: "O tratamento periodontal dói?",
    a: "A maioria dos procedimentos é realizada com anestesia local quando necessário. Raspagem e alisamento radicular podem causar sensibilidade leve no pós-operatório, controlada com orientações da equipe.",
  },
  {
    q: "Gengivite tem cura?",
    a: "Sim. Com profilaxia profissional, higiene domiciliar adequada e acompanhamento, a gengivite é reversível. Sem tratamento, pode evoluir para periodontite — por isso a prevenção é essencial.",
  },
  {
    q: "Com que frequência devo fazer limpeza?",
    a: "Para a maioria dos pacientes, a cada seis meses. Quem já teve periodontite ou apresenta fatores de risco pode precisar de visitas a cada três ou quatro meses — a periodicidade é definida na avaliação individual.",
  },
  {
    q: "Periodontite e implantes — qual a relação?",
    a: "Implantes exigem gengiva e osso saudáveis para osseointegração e manutenção. Doença periodontal não tratada compromete o sucesso de implantes e próteses. Por isso, a saúde gengival é etapa fundamental em qualquer reabilitação oral.",
  },
  {
    q: "Como agendar uma avaliação?",
    a: "Entre em contato pelo formulário ou WhatsApp. Nossa equipe direciona seu caso para avaliação periodontal completa e plano de tratamento personalizado.",
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

export default function PeriodontiaPage() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src="/Periodontia.jpeg"
          alt="Saúde gengival e tratamento periodontal"
          fill
          priority
          quality={90}
          className="object-cover object-center"
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
              Saúde dos tecidos de suporte
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
              Periodontia
            </h1>
            <p className="text-xl text-white/85 leading-relaxed mb-8">
              Cuidado com tecidos que circundam o dente, como a gengiva, osso e
              ligamento periodontal.
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
                A base de um sorriso saudável
              </h2>
              <p className="text-ink-secondary text-lg leading-relaxed mb-6">
                Gengivas saudáveis são o alicerce de qualquer sorriso. A
                periodontia cuida dos tecidos que envolvem e sustentam dentes e
                implantes dentários — prevenindo e tratando as doenças
                gengivais, periodontais e perimplantares.
              </p>
              <p className="text-ink-secondary text-lg leading-relaxed">
                O foco principal é o controle do acúmulo de placa bacteriana,
                fator causador de doenças como gengivite, periodontites,
                perimplantites e cárie.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-graysoft/60 shadow-brand-md"
            >
              <Image
                src="/instrumentos-periodontia-2.jpeg"
                alt="Instrumental especializado para tratamentos periodontais"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-py bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Soluções completas"
            title="Tipos de tratamento"
            subtitle="Da prevenção à cirurgia periodontal — cada caso com indicação e protocolo próprios."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {treatments.map((item, i) => (
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
            tag="Por que tratar"
            title="Benefícios da saúde periodontal"
            subtitle="Gengivas saudáveis protegem seus dentes, sua estética e sua qualidade de vida."
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

      <section className="section-py bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Passo a passo"
            title="Como funciona o tratamento"
            subtitle="Um fluxo clínico organizado, da avaliação inicial à manutenção contínua."
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

      <section className="section-py bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Longevidade do tratamento"
            title="Manutenção periodontal"
            subtitle="A saúde gengival exige cuidado contínuo — em casa e na clínica — para manter os resultados alcançados."
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-ink-secondary text-lg leading-relaxed max-w-3xl mx-auto text-center mb-12 -mt-8"
          >
            Tratar a periodontite é apenas o começo. Na Dall&apos;Agnol, orientamos
            cada paciente sobre higiene domiciliar e realizamos consultas de
            suporte periódicas para que gengivas e dentes permaneçam saudáveis ao
            longo dos anos.
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {maintenanceItems.map((item, i) => (
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-3xl mx-auto bg-section-alt rounded-2xl p-8 border border-graysoft/60"
          >
            <h3 className="text-lg font-medium text-ink mb-4">
              Cuidados em casa que fazem diferença
            </h3>
            <ul className="space-y-3 text-ink-secondary">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>
                  Escovar adequadamente os dentes com a escova multicerdas, bem
                  como o uso diário do fio dental e consultas periódicas com o
                  Periodontista.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>
                  Não ignore sangramento gengival — ele indica inflamação e
                  merece avaliação profissional.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>
                  Manter consultas de profilaxia na clínica, mesmo sem queixas —
                  a prevenção evita recidivas silenciosas.
                </span>
              </li>
            </ul>
          </motion.div>
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
              <Image
                src="/instrumentos-periodontia-4.jpeg"
                alt="Ambiente clínico preparado para procedimentos periodontais"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-3">
                Método Dall&apos;Agnol
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-ink mb-6">
                Cuidado integrado com o sorriso
              </h2>
              <p className="text-ink-secondary text-lg leading-relaxed mb-8">
                A saúde periodontal dialoga com implantes, facetas, ortodontia e
                reabilitação oral. Na clínica, o tratamento gengival é pensado
                dentro de um plano global — para que cada intervenção tenha base
                sólida e resultados duradouros.
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
          <SectionHeading
            tag="Dúvidas frequentes"
            title="Perguntas sobre periodontia"
          />
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
              Cuide das suas gengivas hoje
            </h2>
            <p className="text-ink-secondary text-lg mb-8 max-w-2xl mx-auto">
              Agende uma avaliação periodontal e descubra o plano ideal para
              prevenir ou tratar problemas gengivais — com acompanhamento
              dedicado e integrado aos demais cuidados do seu sorriso.
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
