"use client";

import { useState } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const objectives = [
  {
    value: "lentes",
    label: "Transformação Estética Completa (Lentes/Laminados)",
    focus: "Claudio",
  },
  {
    value: "implantes",
    label: "Implantes ou Reabilitação Oral",
    focus: "Claudio",
  },
  {
    value: "canal",
    label: "Tratamento de Canal ou Dor",
    focus: "Especialista 1",
  },
  {
    value: "harmonizacao",
    label: "Harmonização Orofacial",
    focus: "Especialista 2",
  },
];

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
    objective: "",
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      const message = `Olá! Sou ${formData.name}. Meu objetivo: ${objectives.find((o) => o.value === formData.objective)?.label || formData.objective}. WhatsApp: ${formData.whatsapp}`;
      const url = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999"}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) return formData.name.trim().length > 0;
    if (step === 2) return formData.whatsapp.replace(/\D/g, "").length >= 10;
    if (step === 3) return formData.objective.length > 0;
    return false;
  };

  return (
    <>
      <PageHero
        title="Inicie sua jornada para um sorriso extraordinário"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Formulário de Triagem
              </h2>

              <div className="flex gap-2 mb-8">
                {[1, 2, 3].map((s) => (
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
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-gray-600 mb-4">
                        Qual é o seu principal objetivo hoje?
                      </label>
                      <div className="space-y-3">
                        {objectives.map((obj) => (
                          <label
                            key={obj.value}
                            className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                              formData.objective === obj.value
                                ? "border-primary bg-primary/10"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            <input
                              type="radio"
                              name="objective"
                              value={obj.value}
                              checked={formData.objective === obj.value}
                              onChange={() =>
                                setFormData({
                                  ...formData,
                                  objective: obj.value,
                                })
                              }
                              className="sr-only"
                            />
                            <span className="text-gray-600">{obj.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                  disabled={!canProceed()}
                  className="flex-1 px-6 py-3 bg-primary text-dark-900 font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {step === 3 ? "Enviar via WhatsApp" : "Continuar"}
                </button>
              </div>
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
                <Button
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999"}`}
                  variant="primary"
                >
                  Falar com nosso Concierge de Atendimento
                </Button>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.5!2d-46.65!3d-23.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAwLjAiUyA0NsKwMzknMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização"
                className="grayscale opacity-80"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
