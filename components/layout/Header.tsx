"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/equipe", label: "Equipe" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-b border-graysoft/60 shadow-brand-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
              <Image
                src="/LogoDallAgnol.png"
                alt="Dall Agnol Odontologia"
                width={96}
                height={96}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ink-secondary hover:text-primary transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contato"
              className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium uppercase tracking-wide hover:bg-primary-hover hover:shadow-brand-md hover:-translate-y-px transition-all"
            >
              Agendar Consulta
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-ink-secondary hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4 border-t border-graysoft/60">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-ink-secondary hover:text-primary py-2 text-sm uppercase tracking-wide"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contato"
                  className="block bg-primary text-white px-5 py-3 rounded-lg font-medium text-center uppercase tracking-wide text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Agendar Consulta
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
