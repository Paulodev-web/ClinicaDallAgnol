"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const especialidades = [
  {
    title: "Facetas",
    description: "Transformação do sorriso com precisão e naturalidade.",
    image: "/Foto_Faceta.jpeg",
    imageClass: "object-cover object-[center_50%]",
    href: "/facetas",
    highlight: true,
  },
  {
    title: "Implantodontia",
    description: "Reabilitação oral com tecnologia de ponta.",
    image: "/modelo-protese-implante-1.jpeg",
    href: "/implantodontia",
    highlight: true,
  },
  {
    title: "Ortodontia",
    description: "Alinhamento e correção da posição dos dentes.",
    image: "/Ortodontia.jpg",
    href: "/servicos#ortodontia",
    highlight: false,
  },
  {
    title: "Endodontia",
    description: "Precisão microscópica e salvamento dental.",
    image: "/Endodontia.jpg",
    href: "/servicos#endodontia",
    highlight: false,
  },
  {
    title: "Periodontia",
    description: "Saúde das gengivas e dos tecidos de suporte do sorriso.",
    image: "/Periodontia.jpeg",
    href: "/periodontia",
    highlight: true,
  },
];

export function PillarsSection() {
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
            Áreas de excelência
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-ink mb-4">
            Especialidades
          </h2>
          <p className="text-ink-secondary max-w-2xl mx-auto text-lg">
            Serviços de alta performance para quem busca excelência em saúde oral
          </p>
        </motion.div>

        {/* Carrossel no mobile */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-4 pb-2">
            {especialidades.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex-shrink-0 w-[85vw] max-w-[340px] snap-center h-full"
              >
                <Link href={item.href} className="block h-full">
                  <div
                    className={`flex flex-col h-full overflow-hidden rounded-2xl border transition-all duration-300 ${
                      item.highlight
                        ? "bg-surface border-primary/40 shadow-brand-md"
                        : "bg-surface border-graysoft/60 shadow-brand-sm"
                    }`}
                  >
                    <div className="relative aspect-[4/3] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        quality={100}
                        className={item.imageClass ?? "object-cover"}
                        sizes="85vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <h3 className="absolute bottom-4 left-4 right-4 text-lg font-semibold text-white drop-shadow-md">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-ink-secondary text-sm">{item.description}</p>
                      <span
                        className={`inline-block mt-auto pt-3 text-sm font-medium ${
                          item.highlight ? "text-primary" : "text-ink-secondary"
                        }`}
                      >
                        Saiba mais →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grid no desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {especialidades.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <Link href={item.href} className="block h-full">
                <div
                  className={`flex flex-col h-full overflow-hidden rounded-2xl border transition-all duration-300 group ${
                    item.highlight
                      ? "bg-surface border-primary/40 shadow-brand-md hover:shadow-brand-hover"
                      : "bg-surface border-graysoft/60 shadow-brand-sm hover:border-primary/30 hover:shadow-brand-md"
                  }`}
                >
                  <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      quality={100}
                      className={`${item.imageClass ?? "object-cover"} transition-transform duration-500 group-hover:scale-105`}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-medium text-ink mb-2">
                      {item.title}
                    </h3>
                    <p className="text-ink-secondary text-sm">{item.description}</p>
                    <span
                      className={`inline-block mt-auto pt-4 text-sm font-medium ${
                        item.highlight ? "text-primary" : "text-ink-secondary"
                      }`}
                    >
                      Saiba mais →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
