"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const gallery = [
  {
    image: "/modelos-protese-implante-2.jpeg",
    title: "Reabilitação sobre implantes",
    caption: "Planejamento protético fundamentado em estudo e técnica.",
  },
  {
    image: "/instrumentos-periodontia-1.jpeg",
    title: "Protocolos rigorosos",
    caption: "Instrumental organizado e esterilizado para cada procedimento.",
  },
  {
    image: "/mesa-ortodontia-1.jpeg",
    title: "Cada detalhe no lugar",
    caption: "Preparo minucioso que sustenta resultados previsíveis.",
  },
];

export function StructureSection() {
  return (
    <section className="section-py bg-page">
      <div className="container-brand">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-3">
            Por dentro da clínica
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-ink mb-4">
            Nossa Estrutura
          </h2>
          <p className="text-ink-secondary max-w-2xl mx-auto text-lg">
            Um ambiente preparado para entregar excelência em cada etapa — do
            planejamento à execução.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, i) => (
            <motion.div
              key={item.image}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-graysoft/60 shadow-brand-md transition-shadow duration-300 hover:shadow-brand-hover"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  quality={100}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-medium text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
