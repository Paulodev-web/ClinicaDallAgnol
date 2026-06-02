"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAutoplayVideo } from "@/lib/useAutoplayVideo";

type TechItem =
  | {
      empty: false;
      title: string;
      description: string;
      imageAlt: string;
      image?: string;
      video?: string;
      imageObjectPosition?: string;
    }
  | { empty: true };

const techItems: TechItem[] = [
  {
    title: "Escaneamento Intraoral",
    description:
      "Captura digital precisa dos dentes, sem moldagens desconfortáveis, para planejamento personalizado de cada tratamento.",
    video: "/Intra-oral.mp4",
    imageAlt: "Dr. Claudio Dall'Agnol realizando escaneamento intraoral na clínica",
    empty: false,
  },
  {
    title: "Raio X Portátil",
    description: "Diagnóstico rápido e preciso direto no consultório.",
    image: "/Claudiocomintraoral.jpg",
    imageAlt: "Dr. Claudio Dall'Agnol realizando diagnóstico no consultório",
    imageObjectPosition: "55% 35%",
    empty: false,
  },
  {
    title: "Consultório Completo",
    description: "Ambiente moderno e totalmente equipado para cada etapa do tratamento.",
    image: "/consultorio-cadeira.jpeg",
    imageAlt: "Consultório odontológico equipado da Clínica Dall'Agnol",
    empty: false,
  },
  {
    title: "Instrumental de Precisão",
    description: "Instrumentos de alta qualidade para procedimentos minuciosos e seguros.",
    image: "/instrumental-ortodontia-closeup.jpeg",
    imageAlt: "Instrumental odontológico de precisão em detalhe",
    empty: false,
  },
];

function TechCardVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useAutoplayVideo(ref);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      aria-label={label}
    />
  );
}

export function TechSection() {
  return (
    <section className="section-py bg-section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-3">
            Inovação ao seu alcance
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-ink mb-4">
            Tecnologia e Diferenciais
          </h2>
          <p className="text-ink-secondary max-w-2xl mx-auto text-lg">
            Recursos que reduzem o tempo de tratamento e elevam a precisão dos
            resultados
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {techItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={item.empty ? undefined : { y: -8 }}
              className="group"
            >
              <div className="bg-surface rounded-2xl overflow-hidden shadow-brand-md border border-graysoft/50 transition-shadow duration-300 group-hover:shadow-brand-hover h-full flex flex-col min-h-[280px]">
                {item.empty ? (
                  <div className="aspect-[4/3] bg-section-alt" />
                ) : (
                  <>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {item.video ? (
                        <TechCardVideo src={item.video} label={item.imageAlt} />
                      ) : item.image ? (
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          quality={100}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          style={
                            item.imageObjectPosition
                              ? { objectPosition: item.imageObjectPosition }
                              : undefined
                          }
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="p-6 flex-1">
                      <h3 className="text-xl font-medium text-ink mb-3">
                        {item.title}
                      </h3>
                      <p className="text-ink-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
