import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DR_CLAUDIO_PROFILE_PAGE_ENABLED } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Dr. Claudio Dall'Agnol | Dall Agnol Odontologia",
  description:
    "Diretor Clínico, cirurgião-dentista e especialista em reabilitação oral, implantodontia e estética dental. Conheça a trajetória e a abordagem do Dr. Claudio Dall'Agnol.",
};

export default function ClaudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!DR_CLAUDIO_PROFILE_PAGE_ENABLED) {
    redirect("/");
  }

  return children;
}
