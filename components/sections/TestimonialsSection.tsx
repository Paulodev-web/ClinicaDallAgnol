"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useCallback } from "react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  stars: number;
  image?: string;
  /** false = oculto no site, mantido no código para reativar depois */
  enabled?: boolean;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Desde o início senti segurança e transparência em um caso que não era fácil. Sinto não só um sorriso perfeito, muito além das minhas expectativas, mas a volta da autoestima e a vontade de sorrir sem vergonha. Recomendo de olhos fechados — fui acolhida do início ao fim por toda a equipe e pelo Dr. Cláudio.",
    author: "Cauane Soares",
    role: "Ortodontia",
    stars: 5,
  },
  {
    quote:
      "Sou paciente do Dr. Cláudio há uns 14 anos. Iniciei com implantes dentários na arcada superior e inferior, depois realizei facetas nos dentes da frente que estavam desgastados e, recentemente, coloquei lindas porcelanas. Amo o trabalho dele — super atencioso, explica claramente todos os procedimentos e sempre que tenho algum problema sou atendida rapidamente. Indico para todos que quiserem um sorriso mais lindo!",
    author: "Lucena",
    role: "Implantes e Facetas",
    stars: 5,
  },
  {
    quote:
      "Quero expressar minha gratidão por todos esses anos de dedicação, profissionalismo e cuidado. Há cerca de 20 anos tenho a felicidade de contar com o seu atendimento, sempre realizado com atenção, competência e carinho. Agradeço por cada orientação, pelo cuidado e pelo acolhimento em todos os momentos. Que Deus continue abençoando sua vida e sua profissão, para que você siga transformando sorrisos e cuidando das pessoas com a mesma dedicação de sempre.",
    author: "Evanir",
    role: "Paciente há 20 anos",
    stars: 5,
  },
  {
    quote:
      "No início do meu tratamento, realizei a extração de dois dentes sisos com o Dr. Cláudio Dall'Agnol. Desde a primeira consulta, ele me transmitiu muita segurança e tranquilidade, e a cirurgia ocorreu sem qualquer desconforto. Sempre fui muito bem atendida por toda a equipe. O que mais me chamou a atenção foi a forma como o Dr. Cláudio atende seus pacientes, olhando para a saúde bucal de forma integral e não apenas para um problema isolado. Seguindo o protocolo indicado, realizei posteriormente a extração de mais dois sisos e quatro dentes — etapa necessária para alcançar o resultado que hoje tenho a satisfação de ver concretizado. Sou muito grata ao Dr. Cláudio e ao Dr. Gabriel pelo excelente atendimento, profissionalismo e dedicação durante todo o processo. Recomendo com total confiança.",
    author: "Edinara Vedi",
    role: "Cirurgia e Ortodontia",
    stars: 5,
  },
  {
    quote:
      "Aprendi a sorrir novamente e a mastigar corretamente, graças ao tratamento realizado na Clínica Odontológica Dall'agnol! Excelência no atendimento, cortesia, acolhimento, materiais de qualidade e trato diferenciado. Clínica nota 10!",
    author: "Paulo C. V.",
    role: "Paciente",
    stars: 5,
  },
  {
    enabled: false,
    quote:
      "Tratamento de canal sem dor. A tecnologia e o cuidado fazem toda a diferença.",
    author: "Roberto L.",
    role: "Endodontia",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    stars: 5,
  },
  {
    enabled: false,
    quote:
      "Finalmente encontrei um lugar que entende o que é excelência em odontologia.",
    author: "Ana Paula M.",
    role: "Reabilitação Oral",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    stars: 5,
  },
  {
    enabled: false,
    quote:
      "Atendimento impecável do início ao fim. Recomendo de olhos fechados.",
    author: "Carlos R.",
    role: "Implantes",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    stars: 5,
  },
];

const activeTestimonials = testimonials.filter((t) => t.enabled !== false);

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="bg-surface rounded-xl p-5 border border-graysoft/60 shadow-brand-md h-full flex flex-col relative overflow-hidden flex-shrink-0 w-[85vw] max-w-[340px] md:w-[45vw] md:max-w-[520px] snap-center"
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

      <p className="text-ink-secondary mb-4 text-sm sm:text-base italic leading-relaxed relative z-10">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-auto flex items-center gap-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-primary/10 flex items-center justify-center">
          {testimonial.image ? (
            <Image
              src={testimonial.image}
              alt={testimonial.author}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-primary">
              {testimonial.author
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-ink">{testimonial.author}</p>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {testimonial.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = activeTestimonials.length;

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    setCurrent(index);
  }, []);

  const prev = () => scrollTo((current - 1 + total) % total);
  const next = () => scrollTo((current + 1) % total);

  return (
    <section className="py-10 md:py-14 bg-section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-graysoft/60 shadow-brand-sm mb-4">
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
            <span className="text-sm font-medium text-ink-secondary">
              4.9/5 estrelas no Google
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-light text-ink mb-2">
            Depoimentos
          </h2>
          <p className="text-ink-secondary max-w-2xl mx-auto text-sm sm:text-base">
            O que nossos pacientes dizem sobre a experiência na clínica
          </p>
        </motion.div>

        {/* Carrossel — mobile e desktop */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide flex gap-4 pb-2"
          >
            {activeTestimonials.map((testimonial, i) => (
              <TestimonialCard key={testimonial.author} testimonial={testimonial} index={i} />
            ))}
          </div>

          {/* Controles */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Depoimento anterior"
              className="w-9 h-9 rounded-full border border-graysoft/60 bg-surface shadow-brand-sm flex items-center justify-center text-ink-secondary hover:text-primary hover:border-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {activeTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Ir para depoimento ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-primary w-4" : "bg-graysoft"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Próximo depoimento"
              className="w-9 h-9 rounded-full border border-graysoft/60 bg-surface shadow-brand-sm flex items-center justify-center text-ink-secondary hover:text-primary hover:border-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
