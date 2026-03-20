  "use client";

import { motion } from "framer-motion";

const stats = [
  { value: "+20", label: "anos de experiência" },
  { value: "+10.000", label: "sorrisos transformados" },
  { value: "Especialista", label: "em Lentes e Implantes" },
];

export function AuthorityBar() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <span className="block text-2xl sm:text-3xl font-bold text-primary">
                {stat.value}
              </span>
              <span className="text-gray-600 text-sm sm:text-base">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
