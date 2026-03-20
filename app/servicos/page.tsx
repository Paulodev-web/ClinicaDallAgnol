"use client";

import { PageHero } from "@/components/sections/PageHero";
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
    image: "/Lente-de-contato-dental-estraga-os-dentes.webp",
  },
  {
    id: "implantodontia",
    title: "Implantodontia",
    copy: "Reabilitação oral com tecnologia de ponta.",
    description:
      "Procedimentos de implantes com planejamento digital. Resultados previsíveis e duradouros para recuperar função e estética.",
    image: "/Implantes.jpg",
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
      "Nossa equipe conta com especialista dedicado à Endodontia, utilizando Microscopia Operatória para tratamentos rápidos e indolores.",
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
    title: "Extrações Clínicas",
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

export default function ServicosPage() {
  return (
    <>
      <PageHero
        title="Nossos Serviços"
        subtitle="Excelência em cada especialidade, com o padrão Dall'Agnol de qualidade."
      />

      <section className="py-24 bg-white">
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
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    {service.title}
                  </h3>
                  <p className="text-xl text-gray-600 mb-6">{service.copy}</p>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  <Button
                    href="/contato"
                    variant="primary"
                    size="md"
                    className="mt-8"
                  >
                    Solicitar avaliação com o especialista
                  </Button>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      quality={90}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">
            Especialidades da Equipe
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {delegatedServices.map((service, i) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    quality={90}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.copy}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Button href="/contato" variant="outline" size="sm">
                    Solicitar avaliação
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">
            Nossa Atuação Completa
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {secondarySpecialties.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-200 bg-gray-50/50 hover:border-primary/30 hover:bg-white transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <item.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Oferecemos soluções completas para a sua saúde bucal. Caso não
              encontre a especialidade procurada, consulte nossa equipe.
            </p>
            <Button href="/contato" variant="primary" size="lg">
              Ver Todos os Nossos Tratamentos
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Perguntas Frequentes
          </h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <h4 className="font-semibold text-gray-900 mb-2">{item.q}</h4>
                <p className="text-gray-600">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-6">
            Pronto para iniciar sua jornada?
          </p>
          <Button href="/contato" variant="primary" size="lg">
            Solicitar avaliação com o especialista desta área
          </Button>
        </div>
      </section>
    </>
  );
}
