"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MAPS_URL, ADDRESS, MAPS_EMBED_URL, WHATSAPP_NUMBER } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/track";

const schedule = [
  { days: "Segunda a Sexta", hours: "08h às 18h" },
  { days: "Sábado", hours: "08h às 12h" },
];

export function FooterCTA() {
  const pathname = usePathname();
  const pageOrigin = pathname === "/" ? "home" : (pathname?.replace(/^\//, "") || "home");

  return (
    <section
      className="py-24"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Pronto para elevar o seu sorriso ao próximo nível?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
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
                className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-6 py-3 text-base font-medium text-gray-700 transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50/50 hover:text-emerald-700"
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
            <div className="rounded-2xl overflow-hidden border border-gray-200/80 bg-white group">
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
          className="mt-16 pt-16 border-t border-gray-200/80"
        >
          <div className="grid sm:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-gray-900">
                  Endereço
                </h3>
              </div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#64748b] hover:text-primary transition-colors leading-relaxed block"
              >
                {ADDRESS}
              </a>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-gray-900">
                  Horários de Atendimento
                </h3>
              </div>
              <div className="space-y-2">
                {schedule.map((item) => (
                  <div
                    key={item.days}
                    className="flex flex-wrap items-baseline gap-2"
                  >
                    <span className="font-bold text-gray-900">{item.days}:</span>
                    <span className="text-[#64748b]">{item.hours}</span>
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
