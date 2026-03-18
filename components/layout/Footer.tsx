import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  navegacao: [
    { href: "/", label: "Início" },
    { href: "/clinica", label: "Clínica" },
    { href: "/servicos", label: "Serviços" },
    { href: "/equipe", label: "Equipe" },
    { href: "/blog", label: "Blog" },
    { href: "/contato", label: "Contato" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/LogoDallAgnol.png"
                  alt="Dall Agnol Odontologia"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-display font-bold text-lg text-gray-900">
                Dall Agnol
              </span>
            </Link>
            <p className="text-gray-600 text-sm max-w-xs">
              Odontologia de excelência. Um ecossistema completo de saúde oral
              focado em alta performance estética e funcional.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navegação</h3>
            <ul className="space-y-3">
              {footerLinks.navegacao.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Horário de Atendimento</h3>
            <p className="text-gray-600 text-sm">
              Segunda a Sexta: 8h às 18h
              <br />
              Sábado: 8h às 12h
            </p>
            <p className="text-gray-600 text-sm mt-4">
              Privacidade e facilidade de acesso no coração da cidade.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Dall Agnol Odontologia. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
