import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implantodontia e Protocolo | Dall Agnol Odontologia",
  description:
    "Implantes dentários, protocolo sobre implantes e carga imediata com planejamento digital. Reabilitação oral com o Dr. Claudio Dall'Agnol.",
};

export default function ImplantodontiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
