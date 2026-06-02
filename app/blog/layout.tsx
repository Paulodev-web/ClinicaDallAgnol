import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Dall Agnol Odontologia",
  description:
    "Perspectivas sobre odontologia de excelência — artigos técnicos e conteúdos sobre saúde bucal, estética e bem-estar.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
