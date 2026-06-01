"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Activity,
  Cpu,
  ShieldCheck,
  Smile,
  Clock,
  Check,
  Scan,
  Layers,
  Zap,
  Brush,
  CalendarCheck,
  HeartPulse,
} from "lucide-react";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { Button } from "@/components/ui/Button";

const treatments = [
  {
    icon: Activity,
    title: "Implante unitário",
    description:
      "Substituição de um único dente perdido com pilar e coroa sobre implante — função e estética restauradas sem desgastar dentes vizinhos.",
  },
  {
    icon: Layers,
    title: "Múltiplos implantes",
    description:
      "Reabilitação de vários dentes ausentes com planejamento protético integrado, recuperando mastigação e harmonia do sorriso.",
  },
  {
    icon: Zap,
    title: "Protocolo sobre implantes",
    description:
      "Arcada completa fixa apoiada em implantes estrategicamente posicionados. Solução definitiva para quem perdeu todos ou quase todos os dentes.",
  },
  {
    icon: Clock,
    title: "Carga imediata",
    description:
      "Quando indicado clinicamente, prótese provisória fixa no mesmo dia ou em curto prazo após a cirurgia — menos tempo sem dentes.",
  },
];

const benefits = [
  {
    icon: Smile,
    title: "Função e estética",
    description:
      "Recupere a mastigação, a fala e a confiança de um sorriso completo — com aparência natural e proporções harmoniosas.",
  },
  {
    icon: ShieldCheck,
    title: "Durabilidade",
    description:
      "Implantes de titânio integrados ao osso, com próteses confeccionadas para resistir ao uso diário ao longo dos anos.",
  },
  {
    icon: Scan,
    title: "Planejamento digital",
    description:
      "Escaneamento 3D, tomografia e guias cirúrgicos para posicionamento preciso e previsibilidade do resultado.",
  },
  {
    icon: Cpu,
    title: "Protocolo personalizado",
    description:
      "Cada caso é avaliado individualmente — do implante isolado à reabilitação total — com etapas claras e acompanhamento contínuo.",
  },
];

const steps = [
  {
    number: "01",
    title: "Avaliação e exames",
    description:
      "Consulta detalhada com histórico clínico, exame intraoral, radiografias e tomografia quando necessário. Avaliamos qualidade óssea, saúde gengival e expectativas do paciente.",
  },
  {
    number: "02",
    title: "Planejamento digital",
    description:
      "Escaneamento intraoral e modelagem 3D definem posição dos implantes, formato da prótese e resultado estético final — antes de qualquer intervenção cirúrgica.",
  },
  {
    number: "03",
    title: "Cirurgia guiada",
    description:
      "Instalação dos implantes com protocolos de esterilização rigorosos, anestesia local e, quando indicado, sedação consciente para máximo conforto.",
  },
  {
    number: "04",
    title: "Prótese e acompanhamento",
    description:
      "Após osseointegração (ou em carga imediata, quando possível), confecção e instalação da prótese definitiva, com revisões periódicas de manutenção.",
  },
];

const differentials = [
  {
    icon: Scan,
    title: "Guia cirúrgico digital",
    description: "Posicionamento milimétrico dos implantes.",
  },
  {
    icon: Layers,
    title: "Reabilitação protética",
    description: "Prótese pensada em função, estética e conforto.",
  },
  {
    icon: ShieldCheck,
    title: "Protocolos de biossegurança",
    description: "Instrumental esterilizado e ambiente controlado.",
  },
];

const maintenanceItems = [
  {
    icon: CalendarCheck,
    title: "Consultas periódicas",
    description:
      "Retornos programados — geralmente a cada seis meses — para avaliar implantes, gengiva e prótese, identificando qualquer alteração antes que se torne problema.",
  },
  {
    icon: Brush,
    title: "Limpeza profissional",
    description:
      "Profilaxia específica para implantes e próteses fixas, removendo biofilme e tártaro em regiões de difícil acesso com a higiene domiciliar.",
  },
  {
    icon: HeartPulse,
    title: "Saúde peri-implantar",
    description:
      "Monitoramento da gengiva ao redor dos implantes para prevenir e tratar precocemente inflamações que possam comprometer a estabilidade do tratamento.",
  },
  {
    icon: Layers,
    title: "Manutenção protética",
    description:
      "Verificação de parafusos, coroas, pontes e próteses protocolo. Ajustes, polimento e substituições quando necessário, preservando conforto e função.",
  },
];

const faqItems = [
  {
    q: "O que é implantodontia?",
    a: "É a especialidade que substitui dentes perdidos por implantes de titânio fixados no osso, sobre os quais são instaladas coroas, pontes ou próteses fixas. Restaura função mastigatória e estética de forma duradoura.",
  },
  {
    q: "O que é protocolo sobre implantes?",
    a: "É a reabilitação de uma arcada inteira (superior ou inferior) apoiada em quatro ou mais implantes estrategicamente posicionados. A prótese fixa substitui todos os dentes daquela arcada — solução indicada para perda dentária extensa ou total.",
  },
  {
    q: "O implante dói?",
    a: "A cirurgia é realizada com anestesia local e, quando desejado, sedação consciente. A maioria dos pacientes relata desconforto leve e controlável no pós-operatório, com medicação orientada pela equipe.",
  },
  {
    q: "Quanto tempo dura o tratamento?",
    a: "Varia conforme o caso. Um implante unitário pode levar alguns meses até a prótese definitiva. Em protocolo com carga imediata, é possível sair com dentes fixos provisórios no mesmo dia da cirurgia, quando clinicamente indicado.",
  },
  {
    q: "Todo mundo pode fazer implante?",
    a: "A maioria dos adultos saudáveis é candidata. Condições como diabetes descontrolada, tabagismo intenso ou perda óssea severa exigem avaliação individual — muitas vezes com enxerto ósseo ou outros procedimentos preparatórios.",
  },
  {
    q: "Como cuidar dos implantes e próteses no dia a dia?",
    a: "Escovação regular, fio dental ou interdental e, quando indicado, irrigador oral. Evite hábitos como tabagismo e bruxismo sem acompanhamento. A Manutenção Periódica Preventiva (MPP) na clínica — limpeza profissional e revisão periódica — é essencial para a longevidade do tratamento.",
  },
  {
    q: "Como agendar uma avaliação?",
    a: "Entre em contato pelo formulário ou WhatsApp. Seu caso será direcionado ao Dr. Claudio, especialista em implantes e reabilitação oral, para a primeira consulta de diagnóstico.",
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

export default function ImplantodontiaPage() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src="/implante.jpg"
          alt="Sorriso reabilitado com implantes dentários"
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
              Reabilitação oral de excelência
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
              Implantodontia
            </h1>
            <p className="text-xl text-white/85 leading-relaxed mb-8">
              Implantes, protocolo sobre implantes e carga imediata com
              planejamento digital. Recupere função, estética e qualidade de
              vida com previsibilidade.
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
                Reabilitação pensada para durar
              </h2>
              <p className="text-ink-secondary text-lg leading-relaxed mb-6">
                Os implantes dentários são a solução mais avançada para quem
                perdeu um ou mais dentes. Fixados diretamente no osso, substituem
                as raízes naturais e servem de base para coroas, pontes ou
                próteses fixas — devolvendo mastigação, fala e estética com
                estabilidade.
              </p>
              <p className="text-ink-secondary text-lg leading-relaxed">
                Na Dall&apos;Agnol, o Dr. Claudio — especialista em implantes e
                reabilitação oral — conduz cada caso com planejamento digital,
                guias cirúrgicos e protocolos rigorosos, do implante unitário ao
                protocolo completo com carga imediata.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-graysoft/60 shadow-brand-md"
            >
              <Image
                src="/modelos-protese-implante-2.jpeg"
                alt="Planejamento protético para reabilitação sobre implantes"
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
            subtitle="Do implante isolado ao protocolo de arcada completa — cada caso com indicação e planejamento próprios."
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
            tag="Por que escolher"
            title="Benefícios dos implantes"
            subtitle="Mais do que substituir dentes — restaurar confiança, conforto e qualidade de vida."
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
            title="Como funciona o protocolo"
            subtitle="Um fluxo clínico organizado, transparente e centrado no paciente."
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
            title="Manutenção Periódica Preventiva (MPP)"
            subtitle="Implantes e próteses exigem cuidado contínuo — em casa e na clínica — para preservar saúde, conforto e durabilidade."
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-ink-secondary text-lg leading-relaxed max-w-3xl mx-auto text-center mb-12 -mt-8"
          >
            O sucesso de um implante não termina na instalação da prótese. Na
            Dall&apos;Agnol, orientamos cada paciente sobre higiene domiciliar e
            realizamos a Manutenção Periódica Preventiva (MPP) para que o investimento no
            sorriso se mantenha sólido ao longo dos anos.
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
                  Escovar os dentes e a prótese pelo menos três vezes ao dia, com
                  escova de cerdas macias.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>
                  Usar fio dental, fita ou escovas interdentais nas regiões ao
                  redor dos implantes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>
                  Manter consultas de revisão na clínica, mesmo sem queixas —
                  a prevenção evita complicações silenciosas.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>
                  Informar a equipe sobre bruxismo, rangido ou alterações no
                  encaixe da prótese para avaliação imediata.
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
                src="/instrumentos-periodontia-1.jpeg"
                alt="Instrumental esterilizado para procedimentos de implantodontia"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
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
                Tecnologia a serviço da reabilitação
              </h2>
              <p className="text-ink-secondary text-lg leading-relaxed mb-8">
                Combinamos escaneamento intraoral, tomografia, guias cirúrgicos
                digitais e protocolos de biossegurança para que cada implante seja
                posicionado com precisão — do caso simples à reabilitação
                completa de arcada.
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
            title="Perguntas sobre implantes"
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
              Pronto para recuperar seu sorriso?
            </h2>
            <p className="text-ink-secondary text-lg mb-8 max-w-2xl mx-auto">
              Agende uma avaliação com o Dr. Claudio e descubra a melhor solução
              em implantes — do unitário ao protocolo completo — com planejamento
              digital e acompanhamento dedicado.
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
