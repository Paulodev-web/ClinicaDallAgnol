"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "A experiência superou todas as expectativas. O resultado foi natural e refinado.",
    author: "Maria S.",
    role: "Lentes de Contato",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    stars: 5,
  },
  {
    quote:
      "Tratamento de canal sem dor. A tecnologia e o cuidado fazem toda a diferença.",
    author: "Roberto L.",
    role: "Endodontia",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    stars: 5,
  },
  {
    quote:
      "Finalmente encontrei um lugar que entende o que é excelência em odontologia.",
    author: "Ana Paula M.",
    role: "Reabilitação Oral",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    stars: 5,
  },
  {
    quote:
      "Atendimento impecável do início ao fim. Recomendo de olhos fechados.",
    author: "Carlos R.",
    role: "Implantes",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    stars: 5,
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-xl p-5 border border-[#e2e8f0] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_8px_16px_-6px_rgba(0,0,0,0.04)] h-full flex flex-col relative overflow-hidden flex-shrink-0 w-[85vw] max-w-[340px] md:w-auto md:max-w-none snap-center"
    >
      {/* Aspas de fundo com opacidade baixa */}
      <div
        className="absolute top-4 right-4 text-primary/[0.05] text-6xl font-serif leading-none select-none"
        aria-hidden
      >
        &ldquo;
      </div>

      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-amber-400 text-amber-400"
            strokeWidth={1.5}
          />
        ))}
      </div>

      <p className="text-gray-600 mb-4 text-sm sm:text-base italic leading-relaxed relative z-10">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-auto flex items-center gap-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={testimonial.image}
            alt={testimonial.author}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-gray-900">{testimonial.author}</p>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {testimonial.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#e2e8f0] shadow-sm mb-4">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              4.9/5 estrelas no Google
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Depoimentos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            O que nossos pacientes dizem sobre a experiência na clínica
          </p>
        </motion.div>

        {/* Carrossel no mobile */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-4 pb-2">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={testimonial.author} testimonial={testimonial} index={i} />
            ))}
          </div>
        </div>

        {/* Grid no desktop */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
