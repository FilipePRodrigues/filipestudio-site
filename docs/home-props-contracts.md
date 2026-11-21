# Home — Props/Types Contracts por Seção (Luxury/GSAP)

Objetivo deste documento: definir **contratos de props/types** para tornar a Home **data-driven e incremental**, sem quebrar o que já existe de **DOM/motion** no redesign aprovado.

- **Não é refactor**: é documentação para orientar a futura implementação.
- **Regra de ouro (DOM estável):** IDs âncora, `aria-labelledby` e seletores `data-*`/classes que o motion usa **devem continuar existindo** com a mesma estrutura mínima.
- **Fonte de defaults (compatibilidade incremental):** sempre que existir, o default vem de `src/data/content.ts`.

> Referência de DOM/motion: `docs/home-dom-contract.md`.

---

## Convenções de contrato (aplicável a todas as seções)

### 1) Modelo de dados vs. DOM
- As props devem fornecer **conteúdo** (textos, arrays, links, imagens, etc.).
- A renderização deve manter:
  - `section#<id>` + `aria-labelledby="<id>-title"` (quando aplicável)
  - títulos com classes que suportam **Title masks** (motion): `.luxury-title` (e preservação de `<br>` quando usado no split)
  - nós `data-*` que o motion procura (Hero intro, Flight, Count-up, Pull quote, Image zoom/reveal, Spotlight, Underline sweep, Brand intro).

### 2) Obrigatório vs opcional
- **Obrigatória:** campos que sustentam integridade do DOM/motion (ex.: arrays não-vazios do Flight, IDs/aria, chaves para erros do Contact).
- **Opcional:** variações de conteúdo (ex.: imagem pode ser ausente em cards de Portfolio, mas preserve o contrato se houver motion sobre esse nó).

---

## BrandIntro (opcional, fora do `main#conteudo`)

### 1) Proposta de interface de props (texto)
- `BrandIntroProps`
  - `name` (**Obrigatória**): nome (ex.: "Filipe")
  - `nameSuffix` (**Obrigatória**): sufixo (ex.: "Studio")
  - `monogramSrc` (**Obrigatória**): URL do monograma (svg)

> Observação: hoje o componente também renderiza `data-brand-ring` e `data-brand-rule` como elementos vazios (sem texto). Eles devem continuar existindo no DOM.

### 2) Defaults (src/data/content.ts) e mapeamento
- `name` ← `BRAND.name`
- `nameSuffix` ← `BRAND.nameSuffix`
- `monogramSrc` ← **não existe em** `content.ts` (o src do svg é atualmente embutido em `BrandIntro.tsx` via `assetUrl('/monogram.svg')`)

### 3) Contrato DOM/motion a preservar (home-dom-contract)
- Motion/IDs (dentro do nó):
  - raiz com `data-brand-intro` (no home atual: `div#brandIntro`)
  - filhos:
    - `[data-brand-mark]` (imagem)
    - `[data-brand-ring]`
    - `[data-brand-rule]`

### 4) Riscos & validações recomendadas
- Se `data-brand-intro` ou algum `data-brand-*` for removido/renomeado, o splash pode não executar/ficar inconsistente.
- `data-brand-mark` deve ser um nó existente com mídia renderizada (img ou equivalente); evite condicional que some no primeiro render.

---

## Navbar (opcional)

### 1) Proposta de interface de props (texto)
- `NavbarProps`
  - `theme` (**Obrigatória**): `'light' | 'dark'`
  - `onToggleTheme` (**Obrigatória**): callback
  - `links` (**Obrigatória**): lista de links { `href`, `label` }
  - `ctaHref` (**Opcional**): default pode ser `#contato`

> Para manter o contrato atual de motion, os links devem renderizar `data-underline-sweep`.

### 2) Defaults (src/data/content.ts) e mapeamento
- `links` ← `NAV_LINKS` (e o componente atual ainda adiciona "#/blog" localmente)

### 3) Contrato DOM/motion a preservar
- Para underline sweep (motion):
  - cada link/CTA que usa o efeito deve ter `data-underline-sweep`.
- IDs/hashtags estáveis:
  - `href` precisa bater com as âncoras da Home (`#servicos`, `#beneficios`, `#processo`, `#portfolio`, `#planos`, `#faq`, `#contato`).

### 4) Riscos & validações recomendadas
- Links com `href` inválido quebram navegação e estado ativo por scroll.
- Evitar duplicar `href` (pode causar listas com `key` duplicado e UI inconsistente).

---

## 1) Hero (seção âncora: `#topo`)

### 1) Proposta de interface de props (texto)
- `HeroProps`
  - `introTag` (**Obrigatória**): string do rótulo "Agenda aberta..."
  - `title` (**Obrigatória**): string do `h1` (ou estrutura com destaques, ex.: spans)
  - `subtitle` (**Obrigatória**): string do parágrafo
  - `primaryCta` (**Obrigatória**): { `href`, `label` }
  - `secondaryCta` (**Obrigatória**): { `href`, `label` }
  - `scrollHint` (**Opcional**): string do hint (hoje aparece como "Role para continuar")

### 2) Defaults (src/data/content.ts) e mapeamento
- `subtitle` pode defaultar para `BRAND.tagline` **(proposta)**
- `primaryCta.href` default ← `#contato`
- `secondaryCta.href` default ← `#portfolio`

> Nota: `content.ts` não contém os textos literais atuais do Hero (ex.: "Agenda aberta...", "Sites e landing pages..."). Para compatibilidade incremental, o contrato deve permitir override, mantendo o layout/DOM. Quando o redesign migrar o texto, a fonte pode passar a ser `content.ts`.

### 3) Contrato DOM/motion a preservar
- IDs e aria:
  - `section#topo`
  - `aria-labelledby="hero-title"`
  - `id="hero-title"` no `h1`
- Motion intro (Luxury Motion):
  - contêiner com `data-hero-intro` **deve conter** elementos com `data-hero-part`
  - partes devem existir para stagger (o motion usa `[data-hero-part]` dentro do intro)

### 4) Riscos & validações recomendadas
- `data-hero-part` não deve virar condicional (ou o stagger pode falhar no ciclo inicial).
- Se CTAs mudarem para outro elemento sem preservar `href` com `#contato`/`#portfolio`, quebra navegação por hash.

---

## 2) Services (seção `#servicos`)

### 1) Proposta de interface de props (texto)
- `ServicesProps`
  - `title` (**Obrigatória**): string do `h2#servicos-title`
  - `description` (**Opcional**): string do parágrafo abaixo do título
  - `items` (**Obrigatória**): lista de `Service` (ver `src/types/index.ts`)

### 2) Defaults (src/data/content.ts) e mapeamento
- `items` ← `SERVICES`

### 3) Contrato DOM/motion a preservar
- Seção e aria:
  - `section#servicos`
  - `aria-labelledby="servicos-title"`
  - `h2#servicos-title` deve existir
- Title masks (split):
  - manter `.luxury-title` no `h2` (o motion procura `.luxury-title[data-split]`)

### 4) Riscos & validações recomendadas
- `items` deve ser array (e normalmente não vazio para layout). Se vazio, evitar render “silencioso” que deixa a seção sem conteúdo.
- Validar strings básicas:
  - `service.bullets` deve ser array de strings
  - `service.icon` deve ser um id suportado por `PixelIcon` (senão ícone quebra visualmente)

---

## 3) Benefits (seção `#beneficios`)

### 1) Proposta de interface de props (texto)
- `BenefitsProps`
  - `title` (**Obrigatória**): string do `h2#beneficios-title`
  - `pullQuote` (**Obrigatória**): string do pull quote
  - `items` (**Obrigatória**): lista de `Benefit`
  - `cta` (**Opcional**): { `href`, `label` }

### 2) Defaults (src/data/content.ts) e mapeamento
- `items` ← `BENEFITS`

### 3) Contrato DOM/motion a preservar
- Seção e aria:
  - `section#beneficios`
  - `aria-labelledby="beneficios-title"`
  - `h2#beneficios-title` deve existir
- Pull quote (motion):
  - nó com `data-pull-quote` deve conter texto simples (o motion injeta `.pull-quote__bar` e reprocessa conteúdo)

### 4) Riscos & validações recomendadas
- Se `pullQuote` contiver HTML/markup embutido (ex.: strings com tags), o motion pode reescrever e destruir estrutura.
- Validar `items[*].id/title/description/icon` (icons suportados pelo `PixelIcon`).

---

## 4) Metrics (contagem com Count-up)

### 1) Proposta de interface de props (texto)
- `MetricsProps`
  - `items` (**Obrigatória**): lista de `Metric`
  - `countMapping` (**Opcional**): regra para derivar `count`/`suffix` do `value`

> Hoje, o componente deriva `data-count`/`data-suffix` via função `metricAnim()` (mapeia strings específicas como `"95+"`). No contrato proposto, você pode:
> - (a) manter derivação interna (mais simples), ou
> - (b) receber `count`/`suffix` já prontos em props para reduzir acoplamento.

### 2) Defaults (src/data/content.ts) e mapeamento
- `items` ← `METRICS`
- (proposta) `countMapping` inicial pode replicar o mapeamento atual:
  - `95+` → `data-count=95`, `data-suffix='+'`
  - `100%` → `data-count=100`, `data-suffix='%'`
  - `30–90d` → `data-count=90`, `data-suffix='d'`

### 3) Contrato DOM/motion a preservar
- Count-up (motion):
  - todo elemento que deve animar tem `data-count` (string numérica “limpa”) e opcional `data-suffix`
  - motion sobrescreve `textContent` no onUpdate (evitar colocar markup dentro desse nó)

### 4) Riscos & validações recomendadas
- `data-count` deve ser numérico compatível com o parser do motion (evitar letras/formatos exóticos).
- Garantir que `items` não seja vazia para evitar grid sem conteúdo.

---

## 5) PixelGallery (Flight Scene: `data-flight-section`)

### 1) Proposta de interface de props (texto)
- `PixelGalleryProps`
  - `heading` (**Obrigatória**): string do `h2`
  - `subheading` (**Obrigatória**): string do `p`
  - `cards` (**Obrigatória**): lista de artes { `id`, `src`, `alt` }

> O contrato do Flight depende de haver uma lista com pelo menos 1 card.

### 2) Defaults (src/data/content.ts) e mapeamento
- `cards` ← `PIXEL_ARTS`

### 3) Contrato DOM/motion a preservar
- Raiz do Flight:
  - elemento com `data-flight-section`
- Dentro dele, os nós obrigatórios:
  - `[data-flight-track]`
  - `[data-flight-lean]`
  - `[data-flight-scene]`
  - pelo menos 1 nó `[data-flight-card]` dentro do scene/field

### 4) Riscos & validações recomendadas
- Se `cards.length < 1`, o motion pode abortar (contrato exige lista não vazia).
- Cada card deve renderizar `img` com `src` válido (o motion e layout dependem das dimensões/visual).
- Em mobile/coarse pointer, a UI pode aplicar modo estático: valide que o conteúdo ainda fica legível.

---

## 6) Process (seção `#processo`)

### 1) Proposta de interface de props (texto)
- `ProcessProps`
  - `title` (**Obrigatória**): string do `h2#processo-title`
  - `description` (**Opcional**): parágrafo abaixo do título
  - `steps` (**Obrigatória**): lista de `ProcessStep`

### 2) Defaults (src/data/content.ts) e mapeamento
- `steps` ← `PROCESS_STEPS`

### 3) Contrato DOM/motion a preservar
- Seção e aria:
  - `section#processo`
  - `aria-labelledby="processo-title"`
  - `h2#processo-title` deve existir
- Title masks (split):
  - manter classe `.luxury-title` no título

### 4) Riscos & validações recomendadas
- `steps` deve conter `id/step/title/description` (evita chaves e texto vazio).
- Evitar mudar o elemento que recebe o stagger/reveal (ex.: se você trocar `li`/`TiltCard`, o reveal pode “sumir”).

---

## 7) Portfolio (seção `#portfolio`)

### 1) Proposta de interface de props (texto)
- `PortfolioProps`
  - `title` (**Obrigatória**): string do `h2#portfolio-title`
  - `description` (**Opcional**): parágrafo abaixo do título
  - `items` (**Obrigatória**): lista de `PortfolioItem`

### 2) Defaults (src/data/content.ts) e mapeamento
- `items` ← `PORTFOLIO`

### 3) Contrato DOM/motion a preservar
- Seção e aria:
  - `section#portfolio`
  - `aria-labelledby="portfolio-title"`
- Cards (motion e interação):
  - link/card deve ter `data-spotlight`
  - container de imagem deve manter `data-image-zoom` **e** `data-image-reveal`
  - o nó `data-image-zoom` deve conter um `img` (o motion procura `frame.querySelector('img')`)

### 4) Riscos & validações recomendadas
- Se `items[*].image` vier vazio/undefined e ainda assim `data-image-zoom/data-image-reveal` estiver presente, o motion pode não encontrar `img`.
- Validar `href`:
  - se `href` existe: abrir em nova aba e `rel="noopener noreferrer"`
  - se `href` não existe: garantir que o CTA ainda é coerente (o card atual muda o texto de acordo)

---

## 8) Pricing (seção `#planos`)

### 1) Proposta de interface de props (texto)
- `PricingProps`
  - `title` (**Obrigatória**): string do `h2#planos-title`
  - `description` (**Opcional**): parágrafo abaixo do título
  - `tiers` (**Obrigatória**): lista de `PricingTier`

### 2) Defaults (src/data/content.ts) e mapeamento
- `tiers` ← `PRICING`

### 3) Contrato DOM/motion a preservar
- Seção e aria:
  - `section#planos`
  - `aria-labelledby="planos-title"`
  - `h2#planos-title` deve existir
- Title masks (split):
  - manter `.luxury-title` no título

### 4) Riscos & validações recomendadas
- `tiers[*].features` deve ser array de strings (evita lista quebrada).
- `tiers[*].ctaLabel` deve existir para não deixar o CTA sem texto.
- Garantir consistência do estado `featured` (muda classes e contraste).

---

## 9) FAQ (seção `#faq`)

### 1) Proposta de interface de props (texto)
- `FAQProps`
  - `title` (**Obrigatória**): string do `h2#faq-title`
  - `description` (**Opcional**): parágrafo abaixo do título
  - `items` (**Obrigatória**): lista de `FaqItem`

### 2) Defaults (src/data/content.ts) e mapeamento
- `items` ← `FAQS`

### 3) Contrato DOM/motion a preservar
- Seção e aria:
  - `section#faq`
  - `aria-labelledby="faq-title"`
- Title masks (split):
  - manter `.luxury-title` no título

### 4) Riscos & validações recomendadas
- A implementação atual usa `useId()` para gerar:
  - `aria-controls` e `aria-labelledby` entre trigger/panel
- Se futuramente migrar a props para permitir lazy-load, preserve:
  - `button[aria-controls=<panelId>]` e `div[aria-labelledby=<buttonId>]`
- Validar `items[*].id` (chave/estado) e `question/answer` não vazios.

---

## 10) Contact (seção `#contato`)

### 1) Proposta de interface de props (texto)
- `ContactProps`
  - `title` (**Obrigatória**): string do `h2#contato-title`
  - `description` (**Opcional**): parágrafo abaixo do título
  - `leadSubjectTemplate` (**Opcional**): template para assunto do e-mail/WhatsApp
  - `projectTypes` (**Obrigatória**): lista { `value`, `label` } (valor deve casar com `ProjectType`)
  - `defaultForm` (**Opcional**): `ContactFormData` com valores vazios (compatibilidade)
  - `brandEmail` (**Obrigatória**)
  - `brandPhoneDisplay` (**Opcional**): usado em links

> Nota: o contrato do formulário é essencial porque o componente usa `aria-describedby` apontando para IDs de erro.

### 2) Defaults (src/data/content.ts) e mapeamento
- `brandEmail` ← `BRAND.email`
- `brandPhoneDisplay` ← `BRAND.phoneDisplay`
- WhatsApp link e mailto:
  - `whatsappLink()` e `mailtoLink()` vêm de `src/data/content.ts`
  - (proposta) manter a lógica de `buildLeadMessage()`/`validate()` compatível

> `projectTypes` hoje não existe em `content.ts`: o contrato deve permitir override, mas o default pode continuar vindo do array interno do componente (a ser extraído no futuro).

### 3) Contrato DOM/motion a preservar
- Seção e aria:
  - `section#contato`
  - `aria-labelledby="contato-title"`
  - `h2#contato-title` deve existir
- Title masks (split):
  - manter `.luxury-title` no título
- Acessibilidade do formulário (não é motion, mas é contrato DOM):
  - `input/select/textarea` usam `id` fixos:
    - `name`, `email`, `whatsapp`, `projectType`, `message`
  - `aria-describedby` aponta para IDs de erro:
    - `name-error`, `email-error`, `projectType-error`, `message-error`
  - erros usam `role="alert"`
- Campos obrigatórios (UI atual):
  - `required` + `aria-required="true"`

### 4) Riscos & validações recomendadas
- `ContactFormData` deve ser validado com:
  - `name.length >= 2`
  - `email` formato válido
  - `projectType` selecionado (não pode ficar em `''`)
  - `message.length >= 10`
- WhatsApp/mailer links:
  - garantir encoding correto ao montar `whatsappLink(message)` e `mailtoLink(subject, body)`
- IDs de erro não podem mudar sem atualizar `aria-describedby` (senão acessibilidade quebra e testes falham).

---

## 11) Footer (sem section id de motion, mas com âncoras e links)

### 1) Proposta de interface de props (texto)
- `FooterProps`
  - `brandName` (**Obrigatória**), `brandNameSuffix` (**Obrigatória**), `brandFullName` (**Obrigatória**)
  - `socialLinks` (**Obrigatória**): lista { `id`, `label`, `href` }
  - `navLinks` (**Obrigatória**): lista { `href`, `label` }
  - `privacyAnchorId` (**Obrigatória**): default `privacidade`

### 2) Defaults (src/data/content.ts) e mapeamento
- `brand*` ← `BRAND` (name/nameSuffix/fullName)
- `socialLinks` ← `SOCIAL_LINKS`
- `navLinks` ← `NAV_LINKS`

### 3) Contrato DOM/motion a preservar
- Âncora de privacidade:
  - `footer#privacidade`
- Links de navegação:
  - `href="#topo"`, `#servicos`, `#beneficios`, `#processo`, `#portfolio`, `#planos`, `#faq`, `#contato`

> Motion underline sweep não atua no Footer atual, mas os hashes devem continuar estáveis.

### 4) Riscos & validações recomendadas
- `socialLinks[*].href` inválidos quebram acessibilidade por links.
- Evitar remover `mailto:${BRAND.email}` e WhatsApp (eles fazem parte do contrato funcional de contato).

---

# Checklist final (para implementação futura)

- [ ] Todos os `section#<id>` e `aria-labelledby` obrigatórios permanecem idênticos aos do contrato.
- [ ] Todos os seletores do `motion.ts` continuam existindo:
  - Hero: `data-hero-intro` + `data-hero-part`
  - BrandIntro: `data-brand-intro` + `data-brand-mark|ring|rule`
  - Benefits: `data-pull-quote`
  - Metrics: `data-count`/`data-suffix`
  - PixelGallery: `data-flight-*` + lista não vazia de `data-flight-card`
  - Portfolio: `data-spotlight`, `data-image-zoom` + `data-image-reveal` com `img` dentro
  - Navbar: `data-underline-sweep`
  - Títulos: manter `.luxury-title` para split

---

# Arquivos provavelmente impactados na implementação (menção apenas)

- `src/components/*` (Hero, Services, Benefits, Metrics, PixelGallery, Process, Portfolio, Pricing, FAQ, Contact, Footer)
- `src/App.tsx` (injeção das props por seção / montagem data-driven)
- `src/lib/motion.ts` e hooks de motion:
  - `src/hooks/useLuxuryMotion.ts`, `src/lib/motion.ts`
- Tipos/contratos:
  - `src/types/index.ts` (possível criação de novos tipos para Hero/BrandIntro/Navbar/Fotter se necessário)
- Fonte de defaults:
  - `src/data/content.ts` (possível ampliação para incluir textos literais do Hero e defaults do Contact/projectTypes)
