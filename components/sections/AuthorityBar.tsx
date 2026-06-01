  "use client";

import { motion } from "framer-motion";

const stats = [{ value: "+20", label: "anos de experiência" }];

export function AuthorityBar() {
  return (
    <section className="py-12 bg-section-alt border-y border-graysoft/60">
      <div className="container-brand">
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
              <span className="block text-2xl sm:text-3xl font-light text-primary">
                {stat.value}
              </span>
              <span className="text-ink-secondary text-sm sm:text-base">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
