"use client";

import { useState } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";
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

  const inputClass =
    "w-full px-4 py-3 bg-surface border border-graysoft rounded-lg text-ink placeholder-ink-muted focus:border-primary-mid focus:outline-none focus:ring-1 focus:ring-primary-mid/30 transition-colors";

  return (
    <>
      <PageHero
        title="Cuidando de pessoas, transformando sorrisos"
        subtitle="Nossa equipe de atendimento está pronta para direcionar o seu caso ao especialista ideal."
      />

      <section className="py-24 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-surface rounded-2xl p-8 lg:p-12 border border-graysoft/60 shadow-brand-md"
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
                      <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-light text-ink mb-2">
                      Recebemos seu contato!
                    </h3>
                    <p className="text-ink-secondary text-lg max-w-sm">
                      Logo entraremos em contato.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-3">
                      Primeiro passo
                    </span>
                    <h2 className="text-2xl font-light text-ink mb-8">
                      Formulário de Triagem
                    </h2>

                    <div className="flex gap-2 mb-8">
                      {[1, 2].map((s) => (
                        <div
                          key={s}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            s <= step ? "bg-primary" : "bg-graysoft/60"
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
                            <label className="block text-ink-secondary mb-2">
                              Nome completo
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              placeholder="Seu nome"
                              className={inputClass}
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
                            <label className="block text-ink-secondary mb-2">
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
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className="block text-ink-secondary mb-2">
                              Mensagem ou objetivo (opcional)
                            </label>
                            <textarea
                              value={formData.message}
                              onChange={(e) =>
                                setFormData({ ...formData, message: e.target.value })
                              }
                              placeholder="Ex: Gostaria de agendar avaliação para facetas"
                              rows={3}
                              className={`${inputClass} resize-none`}
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
                      <Button
                        variant="primary"
                        onClick={handleNext}
                        className="flex-1"
                        type="button"
                        disabled={!canProceed() || submitting}
                      >
                        {submitting
                          ? "Enviando..."
                          : step === 2
                            ? "Enviar"
                            : "Continuar"}
                      </Button>
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
              <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-3">
                Como funciona
              </span>
              <h2 className="text-2xl font-light text-ink mb-8">
                O que acontece agora?
              </h2>
              <div className="space-y-6">
                {steps.map((s) => (
                  <div key={s.id} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {s.id}
                    </div>
                    <div>
                      <h3 className="font-medium text-ink">{s.title}</h3>
                      <p className="text-ink-secondary">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-section-alt rounded-xl border border-graysoft/60">
                <h3 className="font-medium text-ink mb-2">
                  Atendimento Concierge
                </h3>
                <p className="text-ink-secondary mb-4">
                  Prefere falar diretamente? Nossa equipe está disponível via
                  WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  onClick={() => trackWhatsAppClick("contato")}
                  className="inline-flex items-center justify-center rounded-lg border-2 border-graysoft px-6 py-3 text-base font-medium text-ink-secondary transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50/50 hover:text-emerald-700"
                >
                  Fale com o Dr. Claudio
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FooterCTA />
    </>
  );
}
