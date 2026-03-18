"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const techItems = [
  {
    title: "Escaneamento Intraoral 3D",
    description: "Precisão digital para planejamento e execução.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80",
    imageAlt: "Tecnologia de escaneamento digital",
  },
  {
    title: "Sedação Consciente",
    description: "Conforto e tranquilidade durante os procedimentos.",
    image:
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80",
    imageAlt: "Ambiente de conforto e tranquilidade",
  },
  {
    title: "Laboratório Digital Próprio",
    description: "Controle total sobre qualidade e prazos.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    imageAlt: "Laboratório de precisão",
  },
];

export function TechSection() {
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
            Inovação ao seu alcance
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tecnologia e Diferenciais
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Recursos que reduzem o tempo de tratamento e elevam a precisão dos
            resultados
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {techItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),0_8px_16px_-6px_rgba(0,0,0,0.04)] border border-gray-100 transition-shadow duration-300 group-hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12),0_16px_24px_-8px_rgba(0,0,0,0.06)] h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
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
