import Link from "next/link";
import Image from "next/image";
import { HttpsSecurityBadge } from "@/components/ui/HttpsSecurityBadge";

const footerLinks = {
  navegacao: [
    { href: "/", label: "Início" },
    { href: "/servicos", label: "Serviços" },
    { href: "/equipe", label: "Equipe" },
    { href: "/blog", label: "Blog" },
    { href: "/contato", label: "Contato" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-section-alt border-t border-graysoft/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/LogoDallAgnol.png"
                  alt="Dall Agnol Odontologia"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-ink-secondary text-sm max-w-xs">
              Odontologia de excelência. Um ecossistema completo de saúde oral
              focado em alta performance estética e funcional.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-primary mb-4">Navegação</h3>
            <ul className="space-y-3">
              {footerLinks.navegacao.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-primary mb-4">Horário de Atendimento</h3>
            <p className="text-ink-secondary text-sm">
              Segunda a Sexta: 8h às 18h
              <br />
              Sábado: 8h às 12h
            </p>
            <p className="text-ink-secondary text-sm mt-4">
              Privacidade e facilidade de acesso no coração da cidade.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-graysoft/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-ink-muted text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Dall Agnol Odontologia. Todos os direitos
            reservados.
          </p>
          <HttpsSecurityBadge />
        </div>
      </div>
    </footer>
  );
}
