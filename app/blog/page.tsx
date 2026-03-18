"use client";

import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";

const clinicalCases = [
  {
    title: "Reabilitação Oral Completa: Devolvendo a função e a harmonia facial",
    challenge: "Paciente com perda múltipla de elementos dentários.",
    planning: "Planejamento digital com mock-up e análise facial.",
    result: "Restauração completa da função mastigatória e estética natural.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80",
  },
];

const articles = [
  {
    title: "A importância da Microscopia na Endodontia Moderna",
    author: "Dr. [Especialista em Canal]",
    excerpt: "Como a tecnologia de microscopia revoluciona tratamentos de canal.",
  },
  {
    title: "Harmonização Orofacial: A busca pela naturalidade",
    author: "Dra. [Especialista em Harmonização]",
    excerpt: "Procedimentos injetáveis com foco em resultados sutis e personalizados.",
  },
  {
    title: "Como as lentes de contato dentais influenciam na sua imagem profissional",
    author: "Dr. Claudio Dall'Agnol",
    excerpt: "O impacto da estética dental na percepção de executivos e empresários.",
  },
  {
    title: "O impacto da saúde bucal na performance esportiva de alto rendimento",
    author: "Dr. Claudio Dall'Agnol",
    excerpt: "Por que atletas de elite investem em saúde oral.",
  },
  {
    title: "Por que o planejamento digital reduz o tempo de cadeira e aumenta a precisão",
    author: "Dr. Claudio Dall'Agnol",
    excerpt: "Tecnologia a serviço da eficiência e dos melhores resultados.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Perspectivas sobre a Odontologia de Excelência"
        subtitle="Artigos técnicos e estudos de casos reais que definem o padrão Dall'Agnol de reabilitação e estética."
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">
            Casos Clínicos
          </h2>
          <div className="space-y-16">
            {clinicalCases.map((c, i) => (
              <motion.article
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200"
              >
                <div className="grid lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-auto">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8 lg:p-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      {c.title}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-primary font-medium">
                          O desafio:
                        </span>{" "}
                        <span className="text-gray-600">{c.challenge}</span>
                      </div>
                      <div>
                        <span className="text-primary font-medium">
                          O planejamento digital:
                        </span>{" "}
                        <span className="text-gray-600">{c.planning}</span>
                      </div>
                      <div>
                        <span className="text-primary font-medium">
                          O resultado:
                        </span>{" "}
                        <span className="text-gray-600">{c.result}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">
            Artigos e Conhecimento
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:border-primary/30 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-primary mb-3">{article.author}</p>
                <p className="text-gray-600 text-sm">{article.excerpt}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Na Mídia e Educação Continuada
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              O Dr. Claudio participa de congressos internacionais, palestras e
              entrevistas, compartilhando conhecimento com a comunidade
              odontológica.
            </p>
            <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden bg-gray-50">
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
                alt="Dr. Claudio em palestra"
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 896px) 100vw, 800px"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
