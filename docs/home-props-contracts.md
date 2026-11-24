# Home — Props/Types Contracts (estado real pós-redesign)

Espelho do estado **real** das props dos componentes da Home após o redesign
(FS-010.3–FS-010.12 + FS-011.x). Este documento foi ressincronizado em
**FS-011.6** lendo os `.tsx` — nada aqui é proposta: é o que o código faz hoje.

- **Não é refactor**: é documentação de contrato para manter a Home estável em
  mudanças futuras.
- **Regra de ouro (DOM estável):** IDs âncora, `aria-labelledby` e seletores
  `data-*`/classes que o `src/lib/motion.ts` usa **devem continuar existindo**
  com a mesma estrutura mínima (ver `docs/home-dom-contract.md`).
- **Fonte de defaults:** sempre que existe, o default vem de
  `src/data/content.ts` (intocado) ou é literal no componente (defaults das
  props). `content.ts` continua sendo a única fonte de conteúdo comercial.

> Referência de DOM/motion: `docs/home-dom-contract.md`.
> Tipos compartilhados: `src/types/index.ts` (`Service`, `Benefit`,
> `ProcessStep`, `PortfolioItem`, `Metric`, `PricingTier`, `FaqItem`,
> `TechItem`, `ContactFormData`, `ProjectType`, `Theme`).

---

## Invariantes globais (não-negociáveis) — para não quebrar motion/DOM/hash

1) **IDs âncora + `aria-labelledby`**
- IDs de navegação da Home permanecem: `#topo`, `#servicos`, `#beneficios`,
  `#processo`, `#portfolio`, `#planos`, `#faq`, `#contato` (mais `#sobre`,
  `#privacidade`, `#pixel-world`, `#brandIntro`, `#heroScrollHint`, `#conteudo`).
- Para cada seção, `aria-labelledby` aponta para o `id` do título
  (`hero-title`, `servicos-title`, `beneficios-title`, `processo-title`,
  `portfolio-title`, `planos-title`, `faq-title`, `contato-title`,
  `sobre-title`, `privacidade-title`).

2) **Idempotência por dataset/estrutura (evitar re-render “travando” motion)**
- `BrandIntro` e `HeroIntro` usam `dataset.done`/flags (motion só executa se o
  guard permitir).
- `.luxury-title` usa `data-split` e faz split via `innerHTML` — títulos são
  **texto + `<br>`** (nunca spans por linha).

3) **Contratos de motion que dependem de detalhes reais do código**
- **Pull quote**: motion insere `.pull-quote__bar` como primeiro filho; o nó
  (`p[data-pull-quote]`) deve aceitar inserção e conter texto simples.
- **Scrub statement** (`[data-scrub-statement]`): inexistente no DOM atual;
  contrato vale só se voltar (motion reescreve `innerHTML`).
- **Portfolio image contracts**: `data-image-zoom` exige `<img>` direto dentro
  do frame; `data-image-reveal` anima o frame via `clipPath` (`img` opcional).
- **Icon flight**: `[data-flight-icon]` é provido por `PixelIcon` (usado em
  Services/Benefits), **não** pela PixelGallery (prancha).
- **Count-up**: `data-count` = número limpo, `data-suffix` = resto, nó **sem
  filhos** (motion sobrescreve `textContent`).

4) **Preservação de nós do DOM**
- Evitar tornar `data-hero-part`, `data-hero-intro`, `data-brand-*`,
  `data-image-*`, `data-spotlight` condicionais ou desmontar/remontar sem
  estratégia (motion depende de nós presentes no DOM).
- Ausência garantida do contrato antigo do Flight de cena: nenhum
  `data-flight-section/track/lean/scene/card` (só `data-flight-icon`, §3.15 do
  contrato de DOM).

---

## Convenções de contrato (aplicável a todas as seções)

### 1) Modelo de dados vs. DOM
- Props fornecem **conteúdo** (textos, arrays, links); a renderização mantém
  `section#<id>` + `aria-labelledby="<id>-title"`, `.luxury-title` (texto +
  `<br>`) e os nós `data-*` do motion.
- Todos os componentes de seção têm props **opcionais com defaults** — a Home é
  renderizada hoje sem repasse de props (os defaults reproduzem o conteúdo
  real).

### 2) Obrigatório vs opcional
- **Obrigatória:** campos que sustentam integridade do DOM/motion (IDs/aria,
  arrays de itens, chaves do formulário).
- **Opcional:** variações de conteúdo (ex.: `description` do Portfolio pode ser
  vazio; o render é condicional).

---

## BrandIntro (splash; fora do `main#conteudo`)

### Props reais (`BrandIntro.tsx`)
- **Nenhuma props** — `export function BrandIntro()`.

### Fonte de conteúdo
- Monograma: `assetUrl('/monogram.svg')` (embutido no componente).
- Nome/sufixo: literais no JSX (`Filipe` / `Studio`), com `data-brand-name`.

### Contrato DOM/motion a preservar
- Raiz `div#brandIntro[aria-hidden="true"][data-brand-intro]`.
- `[data-brand-mark]` (img 96×96), `[data-brand-ring]`, `[data-brand-rule]`,
  `[data-brand-name]`.
- Guards do motion: `dataset.done === '1'`; lock via classe
  `brand-intro-lock` no `documentElement` (removida no cleanup).

---

## Navbar (chrome)

### Props reais (`Navbar.tsx`)
```ts
interface NavbarProps {
  theme: 'light' | 'dark'        // obrigatória
  onToggleTheme: () => void      // obrigatória
}
```
- Não há props de links: `ALL_LINKS = [...NAV_LINKS, { href: '#/blog', label:
  'Blog ↗' }]` é montado internamente (o item do Blog é literal local).

### Fonte de conteúdo
- `BRAND` (monograma/nome), `NAV_LINKS` — `src/data/content.ts`.

### Contrato DOM/motion a preservar
- Links do menu com `data-underline-sweep` (motion injeta `.sweep-line`).
- `href` estáveis casando com as âncoras da Home (+ `#/blog`).
- Estados internos: `data-active`/`data-hover` são hooks de estilo (ScrollProgress/
  CursorFX), não contratos de motion.

---

## Hero (seção `#topo`)

### Props reais (`Hero.tsx`)
```ts
export type HeroProps = {
  agendaText?: string        // default: 'Agenda aberta pra novos projetos'
  titlePrefix?: string       // default: 'Sites e landing pages que'
  titleHighlight?: string    // default: 'transformam clique em cliente'
  introText?: string         // default: lead real ("Eu crio experiências digitais…")
  primaryCtaText?: string    // default: 'Bora conversar'
  secondaryCtaText?: string  // default: 'Ver portfólio'
  shimmerDuration?: number   // default: 6 (segundos do ShimmerText)
}
```
- Todos opcionais, com defaults literais = conteúdo real renderizado.
- O `titlePrefix` é quebrado editorialmente (última palavra fecha a linha 2 do
  H2 bicolor); o texto renderizado permanece idêntico ao default.

### Fonte de conteúdo
- Literais das props + `PIXEL_ARTS[0]` (figura de apoio da cena) do
  `content.ts`.

### Contrato DOM/motion a preservar
- `section#topo` + `aria-labelledby="hero-title"` + `h1#hero-title`
  (`.luxury-title`, texto + `<br>`).
- `[data-hero-intro]` contendo `[data-hero-part]` (5 nós) para o stagger.
- `#heroScrollHint` (`.hero-scrollhint`, `aria-hidden`).
- `HeroLogo` (`[data-hero-logo]` + `[data-image-zoom]` com `<img>` direto).

---

## Portfolio (seção `#portfolio`)

### Props reais (`Portfolio.tsx`)
```ts
export type PortfolioProps = {
  casesLabel?: string        // default: 'Cases' (pixel-label do cabeçalho)
  title?: string             // default: 'Projetos reais,\ndo design ao deploy.'
  description?: string       // default: '' (render condicional; microcopy real
                             // vive só no `.pf-head__micro`)
  items?: PortfolioItem[]    // default: PORTFOLIO (content.ts intocado)
}
```
- `title` aceita `\n` como quebra editorial (linha 1/linha 2 do bicolor);
  strings de linha única renderizam como antes.

### Fonte de conteúdo
- `PORTFOLIO` (`src/data/content.ts`) + microcopy de apresentação por case em
  `CASE_META` interno (arquivo/stack/legenda `fig.`), literal no componente.

### Contrato DOM/motion a preservar
- `section#portfolio` + `aria-labelledby="portfolio-title"`.
- Painel de abas: `role` de tablist/tab/tabpanel + teclado (←/→/Home/End);
  `ScrollTrigger.refresh()` ao trocar de aba (re-calcula os reveals).
- Cards: `data-spotlight`; frames de preview com `data-image-zoom` (com
  `<img>` direto) + `data-image-reveal` reanexados por aba.

---

## Services (seção `#servicos`)

### Props reais (`Services.tsx`)
```ts
type ServicesProps = {
  services?: Service[]          // default: SERVICES (6 itens reais)
  label?: string                // default: '// servicos' (kicker mono)
  titleLines?: [string, string] // default: ['O que eu faço', 'por você']
}
```
- **Nota FS-010.7:** não existem props `heading`/`description` — o H2 bicolor
  é `titleLines` (linha 1 peso 500, linha 2 com fill `grad-marca`), renderizado
  como texto + `<br>` sob `.luxury-title`.

### Fonte de conteúdo
- `SERVICES` (`content.ts`) — 6 itens, destaque editorial em
  "Landing Pages que Convertem", numeração mono 01–06.

### Contrato DOM/motion a preservar
- `section#servicos` + `aria-labelledby="servicos-title"` +
  `h2#servicos-title.section-title.luxury-title`.
- `data-spotlight` nos cards; `data-flight-icon` nos ícones (via `PixelIcon`).
- CTA único "Quero um projeto assim" → `#contato`.

---

## TechStrip (régua de tecnologias)

### Props reais (`TechStrip.tsx`)
- **Nenhuma props** — `export function TechStrip()`.
- Conteúdo: `TECH_STACK` (`TechItem[]` do `content.ts`),
  `aria-label="Tecnologias e plataformas"`. Sem contrato de motion.

---

## Sobre (seção `#sobre`; abriga a prancha, Benefits e Metrics)

### Props reais (`Sobre.tsx`)
- **Nenhuma props** — `export function Sobre()`.
- `section#sobre` + `aria-labelledby="sobre-title"`; composição fixa:
  bio editorial → `PixelGallery` → `Benefits` (`#beneficios` aninhada) →
  `Metrics` (faixa `.metrics`).

---

## PixelGallery (prancha de figuras — `#pixel-world`)

### Props reais (`PixelGallery.tsx`)
```ts
type PixelGalleryHeader = { pixelLabel: string; title: string; description: string }
type PixelGalleryProps = {
  header?: Partial<PixelGalleryHeader>  // default: DEFAULT_HEADER
  arts?: readonly PixelArt[]            // default: PIXEL_ARTS (12 artes)
}
```
- `DEFAULT_HEADER`: `// pixel gallery` / `Um pouco de mim em pixels` /
  `Dev, atleta e criador — a mesma energia que eu levo pros projetos.`

### Fonte de conteúdo
- `PIXEL_ARTS` (`content.ts`) + `FIG_LABELS` interno (`codando` … `headphone`,
  ordem idêntica ao catálogo).

### Contrato DOM/motion a preservar
- `section#pixel-world.prancha` (`aria-label="Artes pixel do Filipe"`).
- 12 `figure.prancha__frame` com `data-image-reveal`; `figcaption.fig` no
  formato `fig. NN · <legenda>` (01–12).
- **Sem** qualquer `[data-flight-section|track|lean|scene|card]` — Flight de
  cena aposentado em FS-010.8 (`setupFlightScene` removido do motion).

---

## Benefits (seção `#beneficios`, aninhada em `#sobre`)

### Props reais (`Benefits.tsx`)
```ts
type BenefitsProps = {
  benefits?: Benefit[]  // default: BENEFITS (6 itens reais)
  label?: string        // default: '// beneficios'
  heading?: string      // default: 'Não é só um site.\nÉ máquina de vender.'
  pullQuote?: string    // default: '// bh, br · one-person studio · do design ao deploy'
  ctaLabel?: string     // default: 'Bora conversar'
}
```
- `heading` usa `\n` como quebra editorial (linha 1/linha 2 do bicolor).

### Contrato DOM/motion a preservar
- `section#beneficios` + `aria-labelledby="beneficios-title"`.
- `p.pull-quote[data-pull-quote]` **limpo** (texto simples; motion injeta
  `.pull-quote__bar` como 1º filho).

---

## Metrics (faixa `.metrics`)

### Props reais (`Metrics.tsx`)
```ts
type MetricsProps = {
  metrics?: Metric[]   // default: METRICS (4 itens reais)
  ariaLabel?: string   // default: 'Números do FilipeStudio'
}
```
- Derivação interna `metricAnim()`: `95+` → count `95`/suffix `+`; `100%` →
  `100`/`%`; `30–90d` → `30`/`–90d`; demais itens estáticos ("Mobile-first").

### Contrato DOM/motion a preservar
- `data-count` = número limpo, `data-suffix` = resto, nó **sem filhos**
  (`setupCountUp` sobrescreve `textContent`).

---

## Process (seção `#processo`)

### Props reais (`Process.tsx`)
```ts
type ProcessProps = {
  steps?: ProcessStep[]         // default: PROCESS_STEPS (4 etapas reais)
  label?: string                // default: '// processo'
  titleLines?: [string, string] // default: ['Simples, transparente', 'e sem surpresa.']
  description?: string          // default: 'Quatro etapas claras pra tirar o projeto do papel e colocar no ar com qualidade.'
}
```

### Contrato DOM/motion a preservar
- `section#processo` + `aria-labelledby="processo-title"` +
  `.luxury-title` (texto + `<br>`).
- Stepper 01–04 via radios `:checked` (teclado nativo, sem JS novo); grade
  semana/dia decorativa `aria-hidden` (15 dias preenchidos).

---

## Pricing (seção `#planos`)

### Props reais (`Pricing.tsx`)
```ts
type PricingProps = {
  tiers?: PricingTier[]         // default: PRICING (2 planos reais)
  label?: string                // default: '// planos'
  titleLines?: [string, string] // default: ['Investimento', 'sem enrolação.']
  lead?: string                 // default: 'Pacotes flexíveis pra cada momento do seu negócio. O Profissional é sob medida — conta teu projeto e eu mando a proposta.'
}
```
- Rótulos de CTA por card vivem em `CTA_LABELS` interno (`Quero o Essencial` /
  `Solicitar orçamento`); o `ctaLabel` do `PRICING` no `content.ts` permanece
  intacto.

### Contrato DOM/motion a preservar
- `section#planos` + `aria-labelledby="planos-title"` + `.luxury-title`.
- `data-spotlight` nos cards + `TiltCard`.
- Preços/features do `PRICING` exibidos sem alteração (nunca inventar valor
  para o "Sob consulta").

---

## FAQ (seção `#faq`)

### Props reais (`FAQ.tsx`)
- **Nenhuma props** — `export function FAQ()`.
- Estado interno: `openId` (acordeão 1-aberto; nasce com `FAQS[0].id`).

### Fonte de conteúdo
- `FAQS` (`content.ts`) — 6 perguntas reais; `useId()` para os pares
  `aria-controls`/`aria-labelledby` de trigger/panel.

### Contrato DOM/motion a preservar
- `section#faq` + `aria-labelledby="faq-title"` + `.luxury-title`.
- `button[aria-controls=<panelId>]` e `div[aria-labelledby=<buttonId>]`
  gerados por `useId()`.

---

## Contact (seção `#contato`)

### Props reais (`Contact.tsx`)
- **Nenhuma props** — `export function Contact()`.
- Internos: `PROJECT_TYPES` (5 valores de `ProjectType`), `EMPTY_FORM`,
  `buildLeadMessage()`, `validate()`; estado `form`/`errors`/`sent`.

### Fonte de conteúdo
- `BRAND` (email/telefone), `whatsappLink()`, `mailtoLink()` — `content.ts`.

### Contrato DOM/motion a preservar
- `section#contato` + `aria-labelledby="contato-title"` + `.luxury-title`.
- Formulário: ids fixos `name`/`email`/`whatsapp`/`projectType`/`message`;
  erros `role="alert"` com `aria-describedby` → `name-error`/`email-error`/
  `projectType-error`/`message-error`; `required` + `aria-required="true"`.
- Submit → `window.open(whatsappLink(...))` + painel "Quase lá! 🎉"
  (`#form-success`) + fallback `mailtoLink`; `#form-note` (aviso LGPD).
- **Sem backend novo.**

---

## Footer (chrome; `#privacidade`)

### Props reais (`Footer.tsx`)
- **Nenhuma props** — `export function Footer()`.

### Fonte de conteúdo
- `BRAND`, `SOCIAL_LINKS`, `NAV_LINKS`, `whatsappLink()`, monograma via
  `assetUrl('/monogram.svg')` — `content.ts`/`asset.ts`.

### Contrato DOM/motion a preservar
- `footer#privacidade` + `aria-labelledby="privacidade-title"`.
- Hashes estáveis: `#topo`, `#servicos`, `#beneficios`, `#processo`,
  `#portfolio`, `#planos`, `#faq`, `#contato` (+ links
  `mailto:${BRAND.email}`, WhatsApp e Privacidade/Termos → `#privacidade`).

---

## Componentes de chrome sem props (menção)

`FloatingWhatsApp`, `ThemeToggle` (consumido pela Navbar), `ScrollProgress`
(`data-active`), `ScrollDepth` (`data-parallax`), `CursorFX` (`data-hover`),
`HeroLogo`, `PixelIcon` (`data-flight-icon`), `PixelBackground`, `StatusClock`,
`spell/*` (`ShimmerText`, `TiltCard`) — sem contrato de props; hooks de estilo
(`data-active`/`data-hover`/`data-hero-logo`) não são contratos de motion.

---

# Checklist final (contratos vivos)

- [x] Todos os `section#<id>` e `aria-labelledby` obrigatórios idênticos ao
  contrato de DOM (§2).
- [x] Seletores do `motion.ts` existindo no DOM:
  - Hero: `data-hero-intro` + `data-hero-part`
  - BrandIntro: `data-brand-intro` + `data-brand-mark|ring|rule|name`
  - Benefits: `data-pull-quote`
  - Metrics: `data-count`/`data-suffix`
  - PixelGallery (prancha): 12 `figure[data-image-reveal]` + `figcaption.fig`
    (`fig. NN ·`); **nenhum** `data-flight-*` de cena (só `data-flight-icon`
    dos `PixelIcon`)
  - Portfolio: `data-spotlight`, `data-image-zoom` (com `<img>` direto) +
    `data-image-reveal`
  - Navbar: `data-underline-sweep`
  - Títulos: `.luxury-title` (texto + `<br>`) para o split
- [x] Props reais espelhadas dos `.tsx` (FS-011.6): Hero (7 opcionais),
  Portfolio (`title`/`description`), Services (`titleLines`), Process/Pricing
  (`titleLines`), Benefits/Metrics/PixelGallery; FAQ/Contact/Footer/
  BrandIntro/Sobre/TechStrip sem props.
