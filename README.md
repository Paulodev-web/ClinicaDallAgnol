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

Edite `.env.local` com as credenciais do Supabase:

- `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` — obrigatórios
- `SUPABASE_SERVICE_ROLE_KEY` — opcional, recomendado para o painel admin (evita problemas de permissão)

O número do WhatsApp é definido em `lib/constants.ts`.

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
- **/servicos** - Serviços oferecidos
- **/equipe** - Corpo clínico
- **/blog** - Artigos e casos clínicos
- **/contato** - Formulário de triagem e localização
- **/admin** - Painel administrativo (dashboard, leads, fluxo de caixa)

## Painel Admin

O painel em `/admin` persiste dados no Supabase:

- **Dashboard** — visitas, formulários enviados, cliques no WhatsApp, taxa de conversão
- **Leads** — contatos do formulário e registro de cliques
- **Financeiro** — receitas, despesas, saldo mensal, gráfico fixo x variável

Todos os dados são salvos no banco. Adicione `SUPABASE_SERVICE_ROLE_KEY` no `.env.local` para evitar limites de permissão (obtenha em Supabase Dashboard > Settings > API).
