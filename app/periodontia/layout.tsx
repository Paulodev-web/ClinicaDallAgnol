import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Periodontia | Dall Agnol Odontologia",
  description:
    "Tratamento de gengivite, periodontite e saúde dos tecidos de suporte. Prevenção, raspagem, cirurgia periodontal e manutenção com a equipe Dall'Agnol.",
};

export default function PeriodontiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
