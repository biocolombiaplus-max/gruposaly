"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import WhatsAppButton from "@/components/WhatsAppButton";

const FAQS = [
  {
    question: "¿La visita técnica y la cotización tienen algún costo?",
    answer:
      "No. Agendamos una visita técnica y entregamos un presupuesto detallado sin compromiso, para que evalúes tu proyecto con información real antes de decidir.",
  },
  {
    question: "¿Cuánto tiempo dura una obra o remodelación?",
    answer:
      "Depende del alcance del proyecto. Antes de iniciar, definimos un cronograma claro con fechas de entrega, y te mantenemos informado del avance durante toda la ejecución.",
  },
  {
    question: "¿Ofrecen garantía sobre la obra entregada?",
    answer:
      "Sí, damos garantía por escrito sobre los acabados y la mano de obra de cada proyecto que entregamos.",
  },
  {
    question: "¿En qué ciudades de Colombia trabajan?",
    answer:
      "Ejecutamos proyectos de construcción, remodelación e inmobiliaria en toda Colombia. Escríbenos con tu ubicación y te confirmamos la cobertura para tu proyecto.",
  },
  {
    question: "¿Puedo hacer seguimiento al avance de mi obra?",
    answer:
      "Sí. Durante la ejecución recibes reportes y registro fotográfico periódico del avance, además de visitas de seguimiento acordadas con tu interlocutor asignado.",
  },
  {
    question: "¿Cómo empiezo mi proyecto con Grupo Saly?",
    answer:
      "Escríbenos por WhatsApp contándonos qué necesitas. Agendamos una visita técnica, te entregamos el presupuesto y, si apruebas, definimos el cronograma para iniciar.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <FadeIn className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">
            Preguntas Frecuentes
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-black tracking-tight text-ink-950 sm:text-4xl">
            Resolvemos tus dudas antes de empezar
          </h2>
        </FadeIn>

        <div className="mt-12 divide-y divide-stone-200 rounded-3xl border border-stone-200 bg-stone-50">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-sm font-bold text-ink-950 sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-ink-950/60">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <FadeIn delay={0.1} className="mt-10 text-center">
          <p className="text-sm text-ink-950/50">¿Tienes otra pregunta?</p>
          <div className="mt-4 flex justify-center">
            <WhatsAppButton
              message="Hola, tengo una pregunta sobre los servicios de Grupo Saly."
              label="Pregúntanos por WhatsApp"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
