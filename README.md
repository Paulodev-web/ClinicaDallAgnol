# Clínica Dall'Agnol - Site Institucional

Site moderno e responsivo para a Clínica Dall'Agnol Odontologia, desenvolvido com Next.js 14, TypeScript, Tailwind CSS e Framer Motion.

## Pré-requisitos

- Node.js 18+
- npm ou yarn

## Instalação

```bash
npm install
```

## Configuração

Copie o arquivo `.env.example` para `.env.local` e configure:

```bash
cp .env.example .env.local
```

Edite `.env.local` e defina o número do WhatsApp:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

## Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Estrutura

- `app/` - Páginas e layout (App Router)
- `components/` - Componentes reutilizáveis
- `public/` - Assets estáticos (logo, etc.)

## Páginas

- **/** - Página principal com hero, pilares, depoimentos
- **/clinica** - Sobre a clínica
- **/servicos** - Serviços oferecidos
- **/equipe** - Corpo clínico
- **/blog** - Artigos e casos clínicos
- **/contato** - Formulário de triagem e localização
