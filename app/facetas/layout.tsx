import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facetas Dentárias | Dall Agnol Odontologia",
  description:
    "Transformação do sorriso com facetas de porcelana. Planejamento digital, visagismo e resultados naturais com o Dr. Claudio Dall'Agnol.",
};

export default function FacetasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
