"use client";

/**
 * Assinatura digital do Dr. Claudio Dall'Agnol
 * Fonte Great Vibes para um estilo cursivo elegante que remete a tradição e herança
 */
export function DrClaudioSignature({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-signature text-2xl sm:text-3xl text-zinc-700 ${className}`}
      style={{ fontFamily: "var(--font-signature), cursive" }}
    >
      Dr. Claudio Dall&apos;Agnol
    </span>
  );
}
