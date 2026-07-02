"use client";

import { PageHero } from "@/components/sections/PageHero";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Brush,
  Sparkles,
  Cross,
  Baby,
  ScanFace,
  Activity,
  Layers,
  ShieldCheck,
} from "lucide-react";

const highTicketServices = [
  {
    id: "facetas",
    title: "Facetas",
    copy: "A união entre a ciência da saúde e a arte do sorriso.",
    description:
      "Transformação do sorriso com precisão e naturalidade. Cada caso é planejado com análise facial, visagismo e mock-up digital para resultados harmoniosos e duradouros.",
    image: "/FotoFaceta.jpeg",
    imageClass: "object-cover object-[center_50%]",
  },
  {
    id: "implantodontia",
    title: "Implantodontia",
    copy: "Reabilitação oral com tecnologia de ponta.",
    description:
      "Procedimentos de implantes com planejamento digital. Resultados previsíveis e duradouros para recuperar função e estética.",
    image: "/modelo-protese-implante-1.jpeg",
  },
];

const delegatedServices = [
  {
    id: "ortodontia",
    title: "Ortodontia",
    copy: "Alinhamento e correção da posição dos dentes.",
    description:
      "Tratamentos ortodônticos para corrigir a oclusão e alinhar o sorriso, com técnicas modernas e conforto.",
    image: "/Ortodontia.jpg",
  },
  {
    id: "endodontia",
    title: "Endodontia",
    copy: "Precisão e conforto em cada detalhe.",
    description:
      "Instrumentação mecanizada dos canais radiculares com radiografia digital e localizador apical para maior previsibilidade no tratamento de canal. Procedimento realizado pelo Dr. Gabriel, Especialista em Endodontia.",
    image: "/Endodontia.jpg",
  },
];

const secondarySpecialties = [
  {
    id: "prevencao",
    title: "Prevenção & Profilaxia",
    description: "Limpeza regular e prevenção de doenças.",
    icon: Brush,
  },
  {
    id: "clareamento",
    title: "Clareamento Dental",
    description: "Tratamentos estéticos para um sorriso mais branco.",
    icon: Sparkles,
  },
  {
    id: "extracoes",
    title: "Extrações Dentárias",
    description: "Remoção segura de dentes (sisos, etc.).",
    icon: Cross,
  },
  {
    id: "odontopediatria",
    title: "Odontopediatria",
    description: "Cuidados dedicados aos dentes das crianças.",
    icon: Baby,
  },
  {
    id: "harmonizacao",
    title: "Harmonização Orofacial",
    description: "Tratamentos estéticos para equilibrar o rosto.",
    icon: ScanFace,
  },
  {
    id: "periodontia",
    title: "Periodontia",
    description: "Cuidados com gengivas e tecidos de suporte.",
    icon: Activity,
  },
  {
    id: "proteses",
    title: "Próteses",
    description: "Reabilitação para dentes perdidos (parciais ou totais).",
    icon: Layers,
  },
  {
    id: "restauradora",
    title: "Odontologia Restauradora",
    description: "Tratamento de cáries e restaurações.",
    icon: ShieldCheck,
  },
];

const faqItems = [
  {
    q: "Quanto tempo dura o tratamento com facetas?",
    a: "Com os cuidados adequados, as facetas podem durar muitos anos. A durabilidade depende de hábitos de higiene e acompanhamento regular.",
  },
  {
    q: "O procedimento dói?",
    a: "Utilizamos técnicas de anestesia e sedação consciente quando necessário, garantindo conforto durante todo o procedimento.",
  },
  {
    q: "Como solicitar avaliação?",
    a: "Entre em contato pelo formulário ou WhatsApp. Nossa equipe irá direcionar seu caso ao especialista ideal.",
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

export default function ServicosPage() {
  return (
    <>
      <PageHero
        title="Nossos Serviços"
        subtitle="Excelência em cada especialidade, com o padrão Dall'Agnol de qualidade."
      />

      <section className="section-py bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {highTicketServices.map((service, i) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-16 items-center"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <h3 className="text-2xl font-light text-ink mb-4">
                    {service.title}
                  </h3>
                  <p className="text-xl text-ink-secondary mb-6">{service.copy}</p>
                  <p className="text-ink-secondary leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    {service.id === "facetas" && (
                      <Button href="/facetas" variant="outline" size="md">
                        Saiba mais sobre facetas
                      </Button>
                    )}
                    {service.id === "implantodontia" && (
                      <Button href="/implantodontia" variant="outline" size="md">
                        Saiba mais sobre implantodontia
                      </Button>
                    )}
                    <Button href="/contato" variant="primary" size="md">
                      Solicitar avaliação com o especialista
                    </Button>
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-graysoft/60 shadow-brand-md">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      quality={90}
                      className={service.imageClass ?? "object-cover"}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Equipe multidisciplinar"
            title="Especialidades da Equipe"
          />
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {delegatedServices.map((service) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col h-full bg-surface rounded-2xl overflow-hidden border border-graysoft/60 shadow-brand-md"
              >
                <div className="relative aspect-[4/3] shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    quality={90}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="text-xl font-medium text-ink mb-4">
                    {service.title}
                  </h3>
                  <p className="text-ink-secondary mb-4">{service.copy}</p>
                  <p className="text-ink-secondary leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>
                  <Button href="/contato" variant="outline" size="sm" className="self-start">
                    Solicitar avaliação
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Atuação completa"
            title="Nossa Atuação Completa"
            subtitle="Soluções para cada necessidade em saúde bucal."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {secondarySpecialties.map((item, i) => (
              <motion.div
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="scroll-mt-24 flex flex-col items-center text-center p-6 rounded-2xl border border-graysoft/60 bg-surface shadow-brand-sm hover:border-primary/30 hover:shadow-brand-md transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <item.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="font-medium text-ink mb-2">{item.title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                {item.id === "periodontia" && (
                  <Button href="/periodontia" variant="outline" size="sm">
                    Saiba mais sobre periodontia
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-ink-secondary mb-6 max-w-2xl mx-auto">
              Oferecemos soluções completas para a sua saúde bucal. Caso não
              encontre a especialidade procurada, consulte nossa equipe.
            </p>
            <Button href="/contato" variant="primary" size="lg">
              Ver Todos os Nossos Tratamentos
            </Button>
          </div>
        </div>
      </section>

      <section className="section-py bg-section-alt">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading tag="Dúvidas frequentes" title="Perguntas Frequentes" />
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

      <FooterCTA />
    </>
  );
}
