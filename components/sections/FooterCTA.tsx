"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MAPS_URL, ADDRESS, MAPS_EMBED_URL, WHATSAPP_NUMBER } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/track";

const schedule = [
  { days: "Segunda a Sexta", hours: "08h às 11:30 | 13h às 18h" },
  { days: "Sábado", hours: "08h às 12h" },
];

export function FooterCTA() {
  const pathname = usePathname();
  const pageOrigin = pathname === "/" ? "home" : (pathname?.replace(/^\//, "") || "home");

  return (
    <section className="section-py bg-section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-light text-ink mb-6">
              Pronto para elevar o seu sorriso ao próximo nível?
            </h2>
            <p className="text-ink-secondary text-lg mb-8">
              Nossa equipe está pronta para recebê-lo. Entre em contato e inicie
              sua jornada para um sorriso extraordinário.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contato" variant="primary" size="lg">
                Agendar Consulta
              </Button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(pageOrigin)}
                className="inline-flex items-center justify-center rounded-lg border-2 border-graysoft px-6 py-3 text-base font-medium text-ink-secondary transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50/50 hover:text-emerald-700"
              >
                Fale com o Dr. Claudio
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-graysoft/60 bg-surface shadow-brand-md group">
              <div className="relative aspect-video">
                <iframe
                  src={MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Clínica Dall'Agnol"
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t border-graysoft/60"
        >
          <div className="grid sm:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium text-ink">
                  Endereço
                </h3>
              </div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-secondary hover:text-primary transition-colors leading-relaxed block"
              >
                {ADDRESS}
              </a>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium text-ink">
                  Horários de Atendimento
                </h3>
              </div>
              <div className="space-y-2">
                {schedule.map((item) => (
                  <div
                    key={item.days}
                    className="flex flex-wrap items-baseline gap-2"
                  >
                    <span className="font-medium text-ink">{item.days}:</span>
                    <span className="text-ink-secondary">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
