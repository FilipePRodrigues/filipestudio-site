# Home — DOM & Motion Contract (Luxury/GSAP)

Objetivo: permitir **implementação incremental** do redesign aprovado sem quebrar contratos visuais e de motion já codados.

Este documento define:
- **IDs âncora** das seções da Home (para navegação, rotas com hash e acessibilidade).
- **Contratos de `data-*` e IDs** usados por `src/lib/motion.ts` e pelos componentes atuais.
- **Riscos** ao mexer na marcação.
- **Testes recomendados** (Playwright, futuros) por contrato.

> Regra geral: motion procura seletores no DOM e assume uma estrutura mínima. Se um nó essencial sumir/renomear, a animação pode não rodar (ou lançar erro se houver expectativa de `img`/filhos).

---

## 1) Estrutura base da Home (conteúdo principal)

Na Home (rota `#/` ou sem `#/...`), o layout é renderizado em:
- `main#conteudo` (no `src/App.tsx`).

Ordem de alto nível (atuais):
1. `Hero` (seção `#topo`)
2. `TechStrip` (sem contrato de motion neste doc)
3. `Services` (`#servicos`)
4. `Benefits` (`#beneficios`)
5. `Metrics` (não tem id de seção âncora, mas tem contrato de count-up)
6. `PixelGallery` (seção de Flight; não é uma âncora pedida, mas é contrato de motion)
7. `Process` (`#processo`)
8. `Portfolio` (`#portfolio`)
9. `Pricing` (`#planos`)
10. `FAQ` (`#faq`)
11. `Contact` (`#contato`)

Além disso, `BrandIntro` é renderizado **fora** do `main#conteudo`, antes do `Landing` (rota home).

---

## 2) IDs de seções (contrato de navegação + acessibilidade)

Cada seção abaixo **deve existir** na Home e seguir o padrão:
- `section#<id>`
- `aria-labelledby="<id>-title"` (ou equivalente no componente)
- O elemento referenciado por `aria-labelledby` deve existir e ter `id` correspondente.

| Seção | ID obrigatório | `aria-labelledby` obrigatório (na implementação atual) |
|---|---|---|
| Hero | `#topo` | `hero-title` |
| Serviços | `#servicos` | `servicos-title` |
| Benefícios | `#beneficios` | `beneficios-title` |
| Processo | `#processo` | `processo-title` |
| Portfolio | `#portfolio` | `portfolio-title` |
| Planos | `#planos` | `planos-title` |
| FAQ | `#faq` | `faq-title` |
| Contato | `#contato` | `contato-title` |

> Observação: `Navbar` e CTAs usam hashes como `href="#contato"`, `href="#portfolio"`, etc. Se os IDs mudarem, navegar/ativar estados também quebra.

---

## 3) Contratos visuais e de Motion (`data-*`)

Os contratos abaixo são **exatamente os seletores** que o `src/lib/motion.ts` usa.

### 3.1 Brand Intro (Luxury splash)

**Selectors obrigatórios (dentro de um nó com `data-brand-intro`):**
- Raiz: `[data-brand-intro]`
- Mark: `[data-brand-mark]`
- Ring: `[data-brand-ring]`
- Rule: `[data-brand-rule]`
- (opcional/fora do motion.ts atual) `[data-brand-name]`

**Contrato mínimo: **
- `data-brand-intro` é um contêiner (no home atual: `div#brandIntro`, `aria-hidden="true"`).
- O motion usa `intro.dataset.done === '1'` para não repetir.
- A intro também busca `[data-hero-intro]` no DOM para esconder/alinhar partes.

**Risco comum:** remover/renomear `data-brand-mark|ring|rule` impede a animação do splash ou deixa elementos com estados inconsistentes.

---

### 3.2 Hero Intro (entrada escalonada)

**Selectors obrigatórios:**
- Raiz: `[data-hero-intro]`
- Partes: `[data-hero-part]` (várias, incluindo `h1`, `p`, CTAs e o container de cena)

**Contrato mínimo:**
- `[data-hero-intro]` contém elementos com `data-hero-part`.
- O motion usa `root.dataset.done` e `setupHeroIntro(force)` para controlar execução.

**Risco comum:** se `data-hero-part` virar elemento condicional (ou sumir no SSR/hidratação), o `setupHeroIntro` pode não aplicar stagger.

---

### 3.3 Title masks (máscaras de título)

**Selector:** `.luxury-title[data-split]` (o motion “split” via `innerHTML`).

**Contrato mínimo:**
- O título deve ser `.luxury-title`.
- Se tiver `<br>` como quebra visual, **preservar `<br>`** para o split manter o formato.
- Se o motion já marcou `data-split='1'`, não deve ser reprocessado.

---

### 3.4 Scrub statement (opcional; não aparece nos componentes atuais)

**Selector:** `[data-scrub-statement]`

**Contrato mínimo: **
- O conteúdo deve ser **texto simples** (o motion reescreve `innerHTML` transformando palavras em `<span class="scrub-word">...` e define `aria-label`).
- O motion usa `el.dataset.split` para idempotência.

**Risco:** se o conteúdo contiver HTML interno que precisa ser preservado, o motion vai destruir essa estrutura.

---

### 3.5 Flight Scene (pixel gallery)

**Raiz do Flight:** `[data-flight-section]`

Dentro dele, o motion exige os seguintes nós:
- Track: `[data-flight-track]`
- Lean: `[data-flight-lean]`
- Scene: `[data-flight-scene]`
- Cards: `[data-flight-card]` (lista não vazia)

**Elementos opcionais (para fading de camadas):**
- `.flight__tunnel` (ajusta `style.opacity`)
- `.flight__header` (ajusta `style.opacity`)
- `.flight__field` (ajusta `style.opacity`)

**Contrato mínimo (estrutura):**
- Pelo menos 1 card com `data-flight-card`.
- `[data-flight-scene]` é o nó que recebe mudanças de `z/scale/opacity` via GSAP.
- `[data-flight-lean]` recebe CSS vars `--lean-y`/`--lean-x` com base em pointer.

**Riscos:**
- Em desktop: motion roda com `ScrollTrigger` (scrub) e pointermove.
- Em mobile/coarse pointer: class `flight--static` é aplicada e a cena fica estática.
- Se o número de cards variar (ou `data-flight-card` sumir), espaçamento/viagem da câmera muda.

---

### 3.6 Count-up (métricas)

**Selector:** `[data-count]`

**Contrato mínimo:**
- O nó deve possuir `data-count` como string numérica “limpa” (o motion remove qualquer coisa que não seja dígito ou `.`).
- `data-suffix` é opcional (usado para anexar `%`, `+`, etc.).
- `data-prefix` é opcional (o motion concatena `prefix + n + suffix`).

**Efeito colateral:** o motion sobrescreve `el.textContent` durante o onUpdate.

---

### 3.7 Press feedback (botões)

**Selectors:**
- `.btn-primary`, `.btn-secondary`, `.btn`

**Contrato:**
- No desktop (não coarse pointer), motion aplica scale no `pointerdown/pointerup`.

---

### 3.8 Image Zoom (hover)

**Selector:** `[data-image-zoom]`

**Contrato mínimo:**
- O nó deve conter um `img` (`frame.querySelector('img')`).

**Risco:** se houver `img` em outro lugar/não houver, o motion não aplica zoom.

---

### 3.9 Underline sweep (nav e CTA)

**Selector:** `[data-underline-sweep]`

**Contrato mínimo:**
- Motion cria um filho `<span class="sweep-line" aria-hidden="true">` se ainda não existir.
- O componente não deve inserir uma `.sweep-line` já (ou o motion vai detectar e não duplicar).

---

### 3.10 Image Reveal (reveal por fresta)

**Selector:** `[data-image-reveal]`

**Contrato mínimo:**
- O nó é o “frame” que recebe `clipPath`.
- O motion procura um `img` dentro (opcional), e ajusta `scale` na entrada.
- Motion usa `frame.dataset.revealed === '1'` para não repetir.

---

### 3.11 Spotlight (detalhe rastreado pelo pointer)

**Selector:** `[data-spotlight]`

**Contrato mínimo:**
- O nó precisa ser “interável” (ter pointer/focus). Motion adiciona `.spotlight-layer` e atualiza CSS vars `--spot-x/--spot-y`.

**Risco:** se a região não for hover/focável, a camada pode nunca entrar em estado `is-on`.

---

### 3.12 Velocity skew (opcional; CSS vars)

**Selector:** `[data-velocity-skew]`

**Contrato mínimo:**
- Motion apenas define `style.setProperty('--skew', '<value>deg')` continuamente.
- Deve existir CSS usando `--skew`.
- **Nota:** no código/DOM atual da Home, **não existem** elementos com `[data-velocity-skew]`, então `setupVelocitySkew()` fica inerte até esses nós serem inseridos.

---

### 3.13 Parallax depth

**Selector:** `[data-parallax]`

**Contrato mínimo:**
- Valor numérico em `data-parallax` (ex: `0.4`, `50`). Motion usa `Number(el.dataset.parallax) || 40`.
- O `ScrollTrigger` usa `trigger: el.closest('section') || el`.

**Risco:** se o elemento não ficar dentro de uma seção (ou sem `<section>` no DOM), o gatilho muda.

---

### 3.14 Pull quote (editorial)

**Selector:** `[data-pull-quote]`

**Contrato mínimo:**
- O nó deve ser “limpo” e suportar inserção de um filho no início.
- Motion insere `<span class="pull-quote__bar" aria-hidden="true">` antes do conteúdo.
- Motion usa `el.dataset.ready === '1'` para idempotência.

---

### 3.15 Icon flight (ícones pixelados)

**Selector:** `[data-flight-icon]`

**Contrato mínimo:**
- Cada ícone recebe animação de entrada via `ScrollTrigger` e seta `icon.dataset.flown = '1'` no onEnter.
- Depois, para desktop (não coarse pointer), a motion ajusta CSS vars `--lean-y/--lean-x` em todos os ícones dentro da mesma `section`.

---

## 4) Contratos específicos do Home (combinação dos seletores)

Checklist de presença nos componentes atuais (Home):

- **`#topo`**: `section#topo` contém um descendente com `data-hero-intro` (e dentro dele `data-hero-part`) + `id#hero-title`.
- **`BrandIntro`**: raiz `data-brand-intro` com `data-brand-mark`, `data-brand-ring`, `data-brand-rule`.
- **`#servicos`**: `h2#servicos-title.section-title.luxury-title`.
- **`#beneficios`**: `p[data-pull-quote]`.
- **`Metrics`**: métricas usam `data-count` e `data-suffix` (e prefix quando aplicável).
- **`PixelGallery`**: `data-flight-section` + `data-flight-track` + `data-flight-lean` + `data-flight-scene` + `data-flight-card`.
- **`PixelIcon`** (usado em **Services/Benefits**): possui `data-flight-icon` (não é renderizado dentro do `PixelGallery` hoje).
- **`#portfolio`**: cards com `data-spotlight` e thumbnails com `data-image-zoom` + `data-image-reveal`.
- **`Navbar`**: links com `data-underline-sweep`.
- **`HeroLogo`**: elemento com `data-image-zoom` contendo `img`.
- **`ScrollDepth`**: múltiplos `data-parallax`.
- **`#processo/#planos/#faq/#contato`**: titles `.luxury-title` para o mask split.

---

## 5) Riscos (o que normalmente quebra no redesign)

1. **IDs de seções**: mudar `#topo/#servicos/...` quebra navegação por hash e/ou `aria-labelledby`.
2. **`aria-labelledby` apontando para id inexistente**: acessibilidade e testes falham.
3. **Remover `img` dentro de `data-image-zoom`**: zoom não roda (silenciosamente).
4. **Remover nós dentro do Flight** (`data-flight-track/lean/scene`): `setupFlightScene()` aborta e a cena fica sem animação.
5. **Quebrar a estrutura do scrub/pull-quote**: ambos reescrevem/injetam nós e podem destruir conteúdo se houver markup interno.
6. **Duplicar ids**: `aria-labelledby` e navigation podem se tornar ambíguos.
7. **Repetir elementos sem idempotência**: alguns motions guardam `dataset.*` (`done/split/ready/revealed/flown`). Em renders incrementais, pode ser necessário resetar dataset conscientemente.
8. **Media queries / reduced motion**: contratos assumem comportamento consistente entre `prefers-reduced-motion`, coarse pointer e desktop.

---

## 6) Testes recomendados (Playwright) — por contrato

> Estes testes são “futuros”: usar `initLuxuryMotion()` e/ou navegar com a página carregada, garantindo que os contratos existem.

### 6.1 Acessibilidade / IDs
- Verificar que existem `section#topo`, `#servicos`, `#beneficios`, `#processo`, `#portfolio`, `#planos`, `#faq`, `#contato`.
- Para cada seção, validar que `aria-labelledby` referencia um elemento existente com o `id` correto.

### 6.2 Underline sweep (DOM mutation)
- Carregar Home, disparar `initLuxuryMotion()` e depois:
  - para cada `[data-underline-sweep]`, validar que existe `.sweep-line` como filho (1x).

### 6.3 Pull quote injection + reveal
- Para `[data-pull-quote]`, validar que após init (e/ou ao rolar até a seção) existe `.pull-quote__bar`.
- Validar visibilidade/estados finais após scroll (ex: opacidade > 0 ou estilo transform resolvido).

### 6.4 Count-up (texto final)
- Rolar até a área de `Metrics` e validar que elementos com `data-count` mudam de texto ao final do onEnter.
- Confirmar inclusão de `data-suffix`.

### 6.5 Image reveal/zoom
- `data-image-reveal`: rolar até o card e validar `dataset.revealed === '1'` no frame.
- `data-image-zoom`: simular hover/pointerenter e validar mudança de `img` (ex: `transform: scale(...)` via computed style ou atributo transform no DOM/GSAP).

### 6.6 Spotlight interaction
- Para `[data-spotlight]`, simular `pointermove` (coordenadas dentro do elemento) e validar:
  - existe `.spotlight-layer`.
  - o elemento entra em `classList.contains('is-on')`.
  - CSS vars `--spot-x/--spot-y` mudam.

### 6.7 Flight (mínimo de integridade)
- Garantir presença dos nós do flight quando em desktop:
  - `[data-flight-section]` contendo `[data-flight-track]`, `[data-flight-lean]`, `[data-flight-scene]`, e ao menos 1 `[data-flight-card]`.
- Simular scroll e validar que o `[data-flight-scene]` recebe mudanças (ex: style inclui `z`/`opacity` alterados).

### 6.8 Reduced motion
- Emular `prefers-reduced-motion: reduce` (ou setar `documentElement.dataset.motion='reduced'`) e validar que:
  - `setupBrandIntro()` não trava o restante (ex: hero partes ficam visíveis sem animação).
  - pelo menos não há erros/stack traces.

---

## 7) Referências de código (contrato → implementação)

- `src/lib/motion.ts`: funções `setupBrandIntro`, `setupHeroIntro`, `setupFlightScene`, `setupCountUp`, `setupImageZoom`, `setupUnderlineSweep`, `setupImageReveal`, `setupSpotlight`, `setupParallaxDepth`, `setupPullQuote`, `setupIconFlight`, etc.
- Componentes Home principais com contratos:
  - `src/components/BrandIntro.tsx`
  - `src/components/Hero.tsx`
  - `src/components/Services.tsx`
  - `src/components/Benefits.tsx`
  - `src/components/Metrics.tsx`
  - `src/components/PixelGallery.tsx`
  - `src/components/Process.tsx`
  - `src/components/Portfolio.tsx`
  - `src/components/Pricing.tsx`
  - `src/components/FAQ.tsx`
  - `src/components/Contact.tsx`
  - `src/components/Navbar.tsx`
  - `src/components/HeroLogo.tsx`
  - `src/components/ScrollDepth.tsx`

---

### Próximo passo sugerido
Antes de qualquer alteração de DOM no redesign:
1. Compare o PR/alteração com este contrato.
2. Garanta que todos os seletores obrigatórios continuam existindo.
3. Atualize o contrato (este arquivo) se e somente se o contrato aprovado mudar.
