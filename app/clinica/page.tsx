"use client";

import { useRef } from "react";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { DrClaudioSignature } from "@/components/ui/DrClaudioSignature";
import { ArrowRight } from "lucide-react";

export default function ClinicaPage() {
  const legadoSectionRef = useRef<HTMLElement>(null);
  const infraSectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: legadoSectionRef,
    offset: ["start end", "end start"],
  });
  const imageParallaxY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 0]);

  const { scrollYProgress: infraScrollY } = useScroll({
    target: infraSectionRef,
    offset: ["start end", "end start"],
  });
  const infraImageParallaxY = useTransform(infraScrollY, [0, 0.5, 1], [0, 30, 0]);

  return (
    <>
      <PageHero
        title="A excelência em cada detalhe."
        subtitle="Um ambiente projetado para oferecer o máximo rigor clínico em uma experiência de cuidado singular."
        className="py-28"
      />

      <section ref={legadoSectionRef} className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              style={{ y: imageParallaxY }}
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-100 shadow-2xl shadow-zinc-200/50"
            >
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=90"
                alt="Hall de entrada da clínica"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
                O Legado e a Visão
              </h2>
              <p className="text-amber-900/60 italic text-lg">
                Uma filosofia de cuidado que atravessa gerações.
              </p>
              <p className="text-zinc-600 text-base leading-loose">
                O compromisso do Dr. Claudio com a perfeição está impresso em
                toda a equipe e estrutura. A clínica tem uma alma e um método
                próprio, independentemente de quem execute o serviço, garantindo
                confiança na delegação e excelência em cada atendimento.
              </p>
              <div className="pt-4 space-y-6">
                <DrClaudioSignature />
                <Link
                  href="/equipe"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
                >
                  Conheça os especialistas formados sob esta visão
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        ref={infraSectionRef}
        className="py-24 bg-gray-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 order-2 lg:order-1"
            >
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
                Infraestrutura de Elite & Experiência VIP
              </h2>
              <p className="text-gold-600 text-lg leading-relaxed font-medium">
                Privacidade e conforto em um novo patamar.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Silêncio absoluto, atendimento personalizado e total discrição.
                Cada detalhe da Clínica Dall&apos;Agnol foi meticulosamente
                planejado para oferecer uma experiência de elite, transformando
                a percepção tradicional de um ambiente odontológico.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
            >
              <div className="absolute -right-4 -bottom-4 w-full max-w-xl h-[85%] bg-zinc-50 rounded-3xl -rotate-3" />
              <motion.div
                style={{ y: infraImageParallaxY }}
                className="relative w-full max-w-xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-zinc-200/40"
              >
                <Image
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=90"
                  alt="Sala de atendimento de elite"
                  fill
                  quality={90}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 36rem"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <span className="inline-block text-primary/80 text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Recursos de ponta
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Tecnologia e Inovação
            </h2>
            <div className="w-16 h-0.5 bg-gold-600/60 mx-auto mb-6" />
            <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Precisão absoluta a serviço da sua saúde.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200/50">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/Claudiocomintraoral.jpg"
                  alt="Dr. Claudio Dall'Agnol realizando escaneamento intraoral"
                  fill
                  quality={90}
                  className="object-cover object-[55%_35%]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Máquina de Raio X Portátil
                </h3>
                <p className="text-gray-600">
                  Diagnóstico rápido e preciso direto no consultório.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200/50">
              <div className="relative aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=90"
                  alt="Planejamento digital"
                  fill
                  quality={90}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Planejamento Digital
                </h3>
                <p className="text-gray-600">
                  Visualização prévia dos resultados antes de qualquer
                  procedimento.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200/50">
              <div className="relative aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=90"
                  alt="Sedação consciente"
                  fill
                  quality={90}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Sedação Consciente
                </h3>
                <p className="text-gray-600">
                  Conforto e tranquilidade durante procedimentos mais complexos.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Rigor Clínico e Segurança
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Processos de biossegurança e normas internacionais são tratados com
              seriedade absoluta. Depois do luxo e da técnica, garantimos que a
              base — saúde e segurança — é o alicerce de tudo que fazemos.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
