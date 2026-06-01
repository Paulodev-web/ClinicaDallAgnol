# Sistema de Design — Dallagnol Odontologia

**Marca:** Cláudio Dall'Agnol — Cirurgião-Dentista
**Posicionamento:** Dentista-premium discreto
**DNA visual:** Confiança técnica + modernidade sofisticada

> Princípio-mestre: **um especialista respeitado não grita para ser ouvido.**
> Coerência vem de restrição — poucas cores, uma escala tipográfica, um ritmo de espaço.

A fonte única de verdade dos tokens é [`app/globals.css`](app/globals.css) (`:root`).
Sempre aplique por **token**, nunca por valor literal (`#hex`, `text-[14px]`).

---

## Paleta

Nomeada por **papel**, não por aparência.

### Azul de marca

| Token | Hex | Uso |
|---|---|---|
| `--color-brand-primary` | `#2A5F8F` | CTA, H1, nav ativo, ênfase de autoridade |
| `--color-brand-primary-hover` | `#1D4A72` | hover do CTA |
| `--color-brand-mid` | `#4A90C4` | links, hover states, ícones |
| `--color-brand-light` | `#7FB3D8` | bordas suaves, gradientes |
| `--color-brand-xlight` | `#EBF4FA` | fundo de badge, hover fill |

> O azul primário (#2A5F8F) é **reservado** para CTA e destaque de autoridade.
> Se estiver em tudo, não destaca nada.

### Neutros frios (prata)

| Token | Hex | Uso |
|---|---|---|
| `--color-silver` | `#8A9BB0` | textos secundários, ícones discretos |
| `--color-gray-soft` | `#C2C8D0` | bordas, dividers, placeholders |

### Superfícies

| Token | Hex | Uso |
|---|---|---|
| `--color-bg-page` | `#F2F2F0` | fundo geral — **off-white, nunca branco puro** |
| `--color-bg-surface` | `#FFFFFF` | cards, modais, header |
| `--color-bg-section-alt` | `#EDF3F8` | seções alternadas (levíssimo azul) |

### Texto

| Token | Hex | Uso |
|---|---|---|
| `--color-text-primary` | `#1A2A38` | headings e corpo principal |
| `--color-text-secondary` | `#4A5A6A` | subtítulos, labels |
| `--color-text-muted` | `#8A9BB0` | placeholders, captions |
| `--color-text-on-brand` | `#FFFFFF` | texto sobre fundo azul |

---

## Tipografia

- **Headings:** `--font-heading` → **Raleway** (peso **300** = leveza sofisticada)
- **Corpo:** `--font-body` → **Inter** (400/500)
- Fontes carregadas via `next/font` em [`app/layout.tsx`](app/layout.tsx).

### Escala

| Token | Tamanho | Uso |
|---|---|---|
| `--text-xs` | 11px | labels caps |
| `--text-sm` | 13px | captions, badges |
| `--text-base` | 15px | corpo |
| `--text-lg` | 18px | subtítulos |
| `--text-xl` | 22px | H3 |
| `--text-2xl` | 28px | H2 |
| `--text-3xl` | 36px | H1 desktop |
| `--text-hero` | 48px | hero display |

No mobile: H1 → 36px, H2 → 28px.

### Letter spacing

`--tracking-tight` (-0.01em) · `--tracking-wide` (0.06em) · `--tracking-caps` (0.14em, labels all-caps).

---

## Espaçamento, layout e bordas

- Escala base 4/8px: `--space-1` … `--space-32`.
- **Padding mínimo de seção: 80px** vertical (`--space-20`). Espaço negativo é design.
- Largura de conteúdo: `--container-max` (1160px).
- Raios: cards `--radius-lg` (12px), botões/inputs `--radius-md` (8px). Nunca 50px em cards.

## Sombras

Sempre com **tom azulado**, nunca preto puro:
`--shadow-sm` · `--shadow-md` · `--shadow-lg` · `--shadow-hover`.

---

## Componentes (classes utilitárias em `globals.css`)

| Classe | O que é |
|---|---|
| `.btn-primary` | CTA azul sólido, uppercase, hover eleva 1px |
| `.btn-secondary` | Outline azul, fill xlight no hover |
| `.service-card` | Card branco com *accent line* vertical no topo (referência à logo) |
| `.label-caps` | Label all-caps em azul-mid |
| `.section-tag` | Linha vertical fina + label (decorador de seção) |
| `.container-brand` | Container centralizado 1160px |
| `.section-brand` / `.section-brand--alt` | Seção com respiro de 80px / variante com fundo azulado |

---

## Regras inegociáveis

1. Fundo de página nunca é branco puro → `--color-bg-page` (#F2F2F0).
2. Padding mínimo de seção: 80px vertical.
3. Sombras só com tom azulado (tokens `--shadow-*`).
4. Gradientes apenas `#2A5F8F → #4A90C4`. Nunca em texto/ícone isolado.
5. Ícones sempre outline (stroke), em `brand-mid` ou `silver`.
6. Headings em weight 300 (Raleway Light).
7. Raios moderados (cards 12px, botões/inputs 8px).
8. Separadores verticais finos (1px) em `brand-light`.
9. Texto secundário sempre em `text-secondary`/`silver` — nunca cinza hardcoded.
10. Fotografia: fundo neutro ~#F2F2F0, luz natural, sem banco de imagem genérico.

---

## Estado da implementação

- [x] Tokens globais em `app/globals.css` (cores, tipo, espaço, raio, sombra, transição)
- [x] Tipografia base (off-white + Inter no corpo, Raleway 300 nos headings)
- [x] Fontes Raleway + Inter via `next/font` em `app/layout.tsx`
- [x] Classes de componente de marca (`.btn-primary`, `.service-card`, etc.)
- [ ] `tailwind.config.ts`: mapear `font-serif`→Raleway, `font-sans`→Inter e expor cores de marca como utilitários (`bg-brand-primary` …)
- [ ] Refatorar componentes em `components/sections/*` e `components/layout/*` para trocar literais (gray-*, bg-white, cyan-*) por tokens
- [ ] Rodar `node .claude/skills/identidade-visual/scripts/auditar_cores.mjs` e zerar valores fora do sistema
