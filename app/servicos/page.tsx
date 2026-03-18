"use client";

import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";

const highTicketServices = [
  {
    id: "lentes",
    title: "Lentes de Contato e Estética",
    copy: "A união entre a ciência da saúde e a arte do sorriso.",
    description:
      "O Dr. Claudio planeja cada caso com análise facial, visagismo e mock-up digital. Não é apenas colocar lente — é um projeto de arquitetura facial liderado por um especialista premiado.",
  },
  {
    id: "implantes",
    title: "Implantes e Carga Imediata",
    copy: "Reabilitação oral com tecnologia de ponta.",
    description:
      "Procedimentos de implantes com planejamento digital e carga imediata quando indicado. Resultados previsíveis e duradouros.",
  },
];

const delegatedServices = [
  {
    id: "endodontia",
    title: "Endodontia Avançada - Microscopia",
    copy: "Precisão e conforto em cada detalhe.",
    description:
      "Nossa equipe conta com especialista dedicado exclusivamente à Endodontia Avançada, utilizando Microscopia Operatória para tratamentos rápidos e indolores.",
  },
  {
    id: "harmonizacao",
    title: "Harmonização Orofacial",
    copy: "Estética Orofacial e Naturalidade.",
    description:
      "Referência em procedimentos injetáveis, focada em realçar a beleza de forma sutil e personalizada.",
  },
];

const faqItems = [
  {
    q: "Quanto tempo dura o tratamento com lentes?",
    a: "Com os cuidados adequados, as lentes podem durar muitos anos. A durabilidade depende de hábitos de higiene e acompanhamento regular.",
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
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">
            Serviços High-Ticket
          </h2>
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
                      src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"
                      alt={service.title}
                      fill
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
                className="bg-white rounded-2xl p-8 border border-gray-200"
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
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
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
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
