"use client";

import { useState } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { MAPS_EMBED_URL, WHATSAPP_NUMBER } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/track";
import { CheckCircle2 } from "lucide-react";

const steps = [
  { id: 1, title: "Triagem", desc: "Analisamos sua necessidade." },
  { id: 2, title: "Agendamento", desc: "Marcamos com o especialista ideal." },
  { id: 3, title: "Avaliação", desc: "Você recebe um diagnóstico preciso." },
];

export default function ContatoPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleNext = async () => {
    if (step < 2) setStep(step + 1);
    else {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.whatsapp.replace(/\D/g, ""),
            message: formData.message || null,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setSubmitError(data.error || "Erro ao enviar. Tente novamente.");
          return;
        }
        setSubmitted(true);
      } catch {
        setSubmitError("Erro de conexão. Verifique sua internet.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) return formData.name.trim().length > 0;
    if (step === 2) return formData.whatsapp.replace(/\D/g, "").length >= 10;
    return false;
  };

  return (
    <>
      <PageHero
        title="Cuidando de pessoas, transformando sorrisos"
        subtitle="Nossa equipe de atendimento está pronta para direcionar o seu caso ao especialista ideal."
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-50 rounded-2xl p-8 lg:p-12 border border-gray-200"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Recebemos seu contato!
                    </h3>
                    <p className="text-gray-600 text-lg max-w-sm">
                      Logo entraremos em contato.
                    </p>
                  </motion.div>
                ) : (
                  <>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Formulário de Triagem
              </h2>

              <div className="flex gap-2 mb-8">
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      s <= step ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-gray-600 mb-2">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Seu nome"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-gray-600 mb-2">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, "");
                          let formatted = raw;
                          if (raw.length > 2)
                            formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
                          if (raw.length > 7)
                            formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
                          setFormData({ ...formData, whatsapp: formatted });
                        }}
                        placeholder="(00) 00000-0000"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-2">
                        Mensagem ou objetivo (opcional)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Ex: Gostaria de agendar avaliação para facetas"
                        rows={3}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-none resize-none"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {submitError && (
                <p className="mt-4 text-red-600 text-sm">{submitError}</p>
              )}

              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed() || submitting}
                  className="flex-1 px-6 py-3 bg-primary text-dark-900 font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting
                    ? "Enviando..."
                    : step === 2
                      ? "Enviar"
                      : "Continuar"}
                </button>
              </div>
                </>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                O que acontece agora?
              </h2>
              <div className="space-y-6">
                {steps.map((s, i) => (
                  <div
                    key={s.id}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {s.id}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{s.title}</h3>
                      <p className="text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Atendimento Concierge
                </h3>
                <p className="text-gray-600 mb-4">
                  Prefere falar diretamente? Nossa equipe está disponível via
                  WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  onClick={() => trackWhatsAppClick("contato")}
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-dark-900 px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
                >
                  Fale com o Dr. Claudio
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Localização e Facilidades
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Privacidade e facilidade de acesso no coração da cidade.
              Estacionamento disponível.
            </p>
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-video max-w-4xl mx-auto border border-gray-200">
              <iframe
                src={MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
