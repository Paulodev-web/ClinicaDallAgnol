import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Great_Vibes, Raleway, Inter } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

// Identidade Dallagnol: Raleway (headings, weight leve) + Inter (corpo)
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-raleway",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
});

export const metadata: Metadata = {
  title: "Dall Agnol | Odontologia de Excelência",
  description:
    "Um ecossistema completo de saúde oral focado em alta performance estética e funcional, liderado pelo Dr. Claudio Dall'Agnol.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${raleway.variable} ${inter.variable} ${plusJakarta.variable} ${playfairDisplay.variable} ${greatVibes.variable} font-sans antialiased`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
