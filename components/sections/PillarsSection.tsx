"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const especialidades = [
  {
    title: "Facetas",
    description: "Transformação do sorriso com precisão e naturalidade.",
    image: "/Lente-de-contato-dental-estraga-os-dentes.webp",
    href: "/servicos#facetas",
    highlight: true,
  },
  {
    title: "Implantodontia",
    description: "Reabilitação oral com tecnologia de ponta.",
    image: "/Implantes.jpg",
    href: "/servicos#implantodontia",
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
];

export function PillarsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-bold text-sm tracking-[0.2em] uppercase mb-3">
            Áreas de excelência
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Especialidades
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
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
                className="flex-shrink-0 w-[85vw] max-w-[340px] snap-center"
              >
                <Link href={item.href}>
                  <div
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 h-full ${
                      item.highlight
                        ? "bg-white border-primary/50 shadow-lg shadow-primary/10"
                        : "bg-white border-gray-200 shadow-sm"
                    }`}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        quality={100}
                        className="object-cover"
                        sizes="85vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <h3 className="absolute bottom-4 left-4 right-4 text-lg font-semibold text-white drop-shadow-md">
                        {item.title}
                      </h3>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <span
                        className={`inline-block mt-3 text-sm font-medium ${
                          item.highlight ? "text-primary" : "text-gray-600"
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
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {especialidades.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Link href={item.href}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 h-full group ${
                    item.highlight
                      ? "bg-white border-primary/50 shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/15"
                      : "bg-white border-gray-200 shadow-sm hover:border-primary/30"
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      quality={100}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <span
                      className={`inline-block mt-4 text-sm font-medium ${
                        item.highlight ? "text-primary" : "text-gray-600"
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
