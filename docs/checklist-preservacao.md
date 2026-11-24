# Checklist de Preservação — §6 do plano (fase-4-plano-implementacao.md)

**Assinado em:** FS-011.6 (lote final), branch `fs/redesign-final`, 2026-11-24.
**Base verificada:** `redesign-home-impl` + rename do token de fonte
(`--font-pixel` → `--font-mono`) + sync de docs deste lote.
**Método:** cada item verificado por grep/leitura de código e pelos gates
(`npm run lint`, `npm run build`, `npx playwright test` 14/14, `npm test`
10/10). Legenda: **VERIFICADO** = evidência direta no código; **LIMITAÇÃO** =
o que a verificação estática não cobre.

---

## 1) Conteúdo comercial exato (palavra a palavra) — VERIFICADO

- `src/data/content.ts` **intocado em todo o redesign** (matriz §5: nenhum lote
  edita; `git log -- src/data/content.ts` termina em commits pré-redesign:
  `34192d3`, `42764cf`, `4702d8e`).
- Contagens conferidas por parsing do arquivo: **6 `SERVICES`**, **6
  `BENEFITS`**, **4 `PROCESS_STEPS`**, **6 `FAQS`**, 4 `METRICS`, 2 `PRICING`,
  blocos de contato via `BRAND`/`whatsappLink`/`mailtoLink`.
- Títulos/leads das seções vêm dos defaults literais das props
  (`docs/home-props-contracts.md` espelha os `.tsx`); nenhum depoimento/métrica
  nova — `METRICS` idem.
- LIMITAÇÃO: comparação é estrutural (fonte única `content.ts` não diffada);
  não houve revisão palavra-a-palavra humana contra o site no ar.

## 2) Preços exatos — VERIFICADO

- `content.ts`: `priceLabel: 'R$ 2.490'` + `priceNote: 'a partir de'` +
  `'Entrega em até 15 dias'`; `'Sob consulta'` + `'Suporte por 60 dias'`.
- Parcelamento 40/30/30: "40% na aprovação, 30% na entrega do design e 30% na
  publicação. Aceito Pix, transferência e cartão." (answer do FAQ de
  pagamento).
- Prazos do FAQ: "Landing page sai em 7 a 10 dias úteis. Site institucional
  leva de 2 a 4 semanas. Projeto customizado, de 4 a 8 semanas."
- Suporte 30–90 dias: "de 30 a 90 dias, conforme o plano" + métrica
  `30–90d` (`data-count=30`, `data-suffix=–90d`).
- `priceRange "R$ 2.490+"` em `src/lib/siteMeta.ts:23` e `index.html:81`.
- LIMITAÇÃO: grafia original ("7 a 10 dias úteis") preservada do `content.ts`;
  o plano cita "7–10 dias úteis" como valor, não como literal.

## 3) SEO/meta (title, description, OG, Twitter, canonical, favicons/manifest,
theme-color, google-site-verification) — VERIFICADO

- `index.html`: `<title>`, `meta description`, `theme-color #0b0b1f`,
  `google-site-verification`, OG (`og:type/locale/title/description/url/
  site_name/image` + dims/alt), Twitter card, canonical, favicons/manifest —
  presentes e **intocados neste lote** (nenhum diff em `index.html`).
- `setPageMeta()` por rota hash intacto (`src/lib/seo.ts:30`, consumido pelo
  router do `App.tsx`).
- Única alteração legítima do redesign no `<head>`: `<link>` de fontes
  (FS-010.1, plano §5 — dono exclusivo).
- LIMITAÇÃO: validação por inspeção estática + e2e; não houve fetch do site
  publicado.

## 4) JSON-LD (ProfessionalService, WebSite, FAQPage) — VERIFICADO

- `index.html`: 3 blocos `application/ld+json` (ProfessionalService,
  WebSite, FAQPage) preservados; `ProfessionalService` com
  `+55-31-99799-8171`, `Belo Horizonte/MG`, `priceRange "R$ 2.490+"`.
- `src/lib/siteMeta.ts`: `buildProfessionalServiceJsonLd()` e
  `buildFaqJsonLd()` (mapeia os 6 `FAQS` reais) — coerentes com `index.html`
  (sem referência a fonte; arquivo **não precisou mudar** no rename).
- Sincronia garantida por `npm test`: `scripts/check-jsonld.test.mjs`
  (FAQS × FAQPage + priceRange) — 10/10 verde.
- LIMITAÇÃO: unificação de fonte duplicada de JSON-LD (index.html × siteMeta)
  é melhoria fora do escopo (plano §6).

## 5) Blog (rotas hash + pipeline) — VERIFICADO

- Rotas `#/blog` e `#/blog/<slug>` via `hashchange`/`parseRoute`
  (`App.tsx:56–61`, `#/blog` no JSON-LD em `App.tsx:136/145`).
- Pipeline Issues→md: `scripts/issue-to-post.mjs` (+ `issue-to-post.test.mjs`
  no `npm test`) e `.github/workflows/blog-from-issue.yml`.
- `src/content/blog/` (3 arquivos: `COMO-POSTAR.md`, `boas-vindas.md`,
  `constancia.md`) + `import.meta.glob('../content/blog/*.md')` em
  `src/lib/blog.ts:4` — nada tocado.

## 6) WhatsApp/formulário/LGPD — VERIFICADO

- `whatsappLink`/`mailtoLink` de `content.ts`; submit →
  `window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')`
  (`Contact.tsx:117`) + painel "Quase lá! 🎉" (`#form-success`) com CTA
  WhatsApp + fallback `mailtoLink` (`Contact.tsx:373/381`).
- `FloatingWhatsApp` presente (usa `whatsappLink`).
- Bloco `#privacidade` integral no Footer (`footer#privacidade` +
  `aria-labelledby="privacidade-title"`); link "Política de Privacidade
  (LGPD)" → `#privacidade` (`Contact.tsx:357`) e aviso abaixo do form
  (`#form-note`).
- **Sem backend novo** (nenhum fetch/endpoint introduzido no redesign).

## 7) Tema claro/escuro — VERIFICADO

- `useTheme` (`src/hooks/useTheme.ts`): `html.dark`/`html.light` +
  `localStorage` + `colorScheme`, **default dark**; toggle na Navbar.
- Tokens light do protótipo ligados em FS-010.12 (paridade AA nos 2 temas —
  contraste medido no lote FS-010.12).
- E2E: teste de toggle `html.dark`↔`html.light` (FS-011.5) verde.
- LIMITAÇÃO: contraste AA não re-medido neste lote (preservado por diff —
  nenhum token de cor alterado em FS-011.6).

## 8) Âncoras/IDs/aria — VERIFICADO

- Greps no DOM render: `#topo`, `#servicos`, `#beneficios` (**`section`** com
  `aria-labelledby`), `#sobre`, `#processo`, `#portfolio`, `#planos`, `#faq`,
  `#contato`, `#privacidade`, `#conteudo`, `#heroScrollHint`, `#brandIntro` —
  todos presentes; títulos `<id>-title` correspondentes (incl.
  `sobre-title`, `privacidade-title`); `aria-labelledby` por seção.
- `docs/home-dom-contract.md` §2 atualizado com `#sobre` e ids suplementares.
- E2E: teste 1 (IDs + `aria-labelledby`) verde.

## 9) Contratos DOM/motion (§3.2 integral + invariantes) — VERIFICADO

- Seletores de `src/lib/motion.ts` × contrato: `[data-brand-*]`,
  `[data-hero-intro]`, `[data-hero-part]`, `[data-scrub-statement]`,
  `[data-count]`, `[data-image-zoom]`, `[data-underline-sweep]`,
  `[data-image-reveal]`, `[data-spotlight]`, `[data-velocity-skew]`,
  `[data-parallax]`, `[data-pull-quote]`, `[data-flight-icon]` — batem 1:1
  (grep; `docs/home-dom-contract.md` §3 espelha).
- Invariantes: `.luxury-title` = texto + `<br>` (conferido nos títulos dos
  componentes); `[data-count]` sem filhos + `data-suffix` (Metrics,
  `metricAnim`); `data-image-zoom` com `<img>` direto (Portfolio/HeroLogo).
- Prancha: 12 `figure[data-image-reveal]` + `figcaption.fig` `fig. NN ·`;
  **zero** `data-flight-section/track/lean/scene/card` (teste 7/14 reforçado).
- E2E 14/14 + `npm test` 10/10 verdes neste lote.

## 10) CSP — VERIFICADO

- `index.html`: 6 tags `<script>` — `gtag/js` (async externo),
  `gtag-init.js` (externo), 3× `application/ld+json` (não executáveis),
  `main.tsx` (module). **Nenhum script inline novo** no redesign; `style-src`
  segue sem `unsafe-inline` (inclui `fonts.googleapis.com` só para o `<link>`
  de fontes — FS-010.1).

## 11) Rotas hash — VERIFICADO

- Router continua por `location.hash`/`hashchange` (`App.tsx`); grep de
  `pushState`/`replaceState` em `src/` = **0 ocorrências**. Sem migração para
  History API.

## 12) Logos oficiais — VERIFICADO

- `FilipeStudio_Logo_Pack/` intocado (fora do escopo de todos os lotes;
  `LEIA-ME.txt` respeitado).
- `monogram.svg` usado como `<img>` (BrandIntro, Navbar ×2, HeroLogo, Footer);
  `logo-horizontal.*` referenciado no JSON-LD/manifest.
- Wordmark **não redesenhado** (chrome usa wordmark de texto; ver comentário
  `chrome.css` "monograma oficial (public/monogram.svg, <img>) + wordmark
  texto").
- LIMITAÇÃO: recomposição oficial do wordmark é fase posterior com designer.

## 13) Sitemap/robots — VERIFICADO

- `public/sitemap.xml` (4 URLs: home, `#/blog`, 2 posts) e `public/robots.txt`
  (`Sitemap:` apontando para o sitemap) — intocados em todos os lotes.

---

## FS-011.6 — rename do token de fonte (registro de render-neutralidade)

- `--font-pixel` → `--font-mono` (valor: `"JetBrains Mono", "JetBrains Mono
  Fallback", ui-monospace, "Courier New", monospace` — fallback stack
  preservado); classe utilitária `font-pixel` → `font-mono` em todos os
  `@apply` (`src/index.css`) e `var(--font-pixel)` → `var(--font-mono)` em
  `src/index.css` + 9 arquivos de `src/styles/home/*.css`.
- **Zero** usos em `.tsx`/testes (grep repo-inteiro confirmou: `font-pixel`
  só existia em CSS).
- **Computed style antes/depois idêntico**: probe Playwright (904 elementos,
  font-family/font-size/font-weight) — 0 diferenças; 212 elementos com
  JetBrains Mono calculado antes e depois; as 2 famílias distintas resolvem
  para os mesmos stacks.
- Blocos `prefers-reduced-motion` preservados: **12** no `src/index.css` +
  **25** escopados em `src/styles/home/*.css`.
- Nenhum assert de teste referenciava `font-pixel` (nenhum ajuste de assert
  necessário).

## Grep final de fontes legadas (`Montserrat|Press Start 2P|Inter`)

Ocorrências restantes e justificativa de cada uma (todas dentro das exceções
do escopo):

| Arquivo | Ocorrência | Justificativa |
|---|---|---|
| `src/index.css` (12 linhas) | `Montserrat` em fallbacks (`--font-display`/`--font-sans` → `"Space Grotesk" … "Montserrat", Arial`), `@font-face` local `local("Montserrat")`, fallbacks `var(--font-display, Montserrat, sans-serif)` e comentários de métrica CLS | **Fallbacks legítimos no CSS** (stacks de segurança pós-Space Grotesk; face local métrica-compatível) |
| `src/index.css` (1 linha) | comentário "Montserrat/Inter/Press Start 2P aposentados do carregamento web" | documentação do próprio rename FS-010.1 (não é carregamento) |
| `public/logo-horizontal.svg` | `font-family="Montserrat, Arial, sans-serif"` no wordmark `<text>` | **SVG do logo** — wordmark oficial intocado (LEIA-ME.txt) |
| `FilipeStudio_Logo_Pack/LEIA-ME.txt` | "A tipografia usa Montserrat como referência…" | documentação do pacote oficial de logos |
| `README.md` | linha "Estilo \| Tailwind CSS 4 · Montserrat" | **README histórico** (pré-redesign; não é código) |

Nenhuma ocorrência de `Press Start` em código; `Inter` só no comentário do
`index.css` acima. Nenhuma face legada é carregada via webfont.

---

## Assinatura

- [x] §6 verificado item a item (itens 1–13) — 2026-11-24, FS-011.6.
- [x] Gates do lote: `npm run lint`, `npm run build`, `npx playwright test`
  (14/14, com lock), `npm test` (10/10) — ver `docs/` e o commit
  `docs/chore(home): final contract docs + font token rename`.
- Limitações registradas nos itens 1, 2, 3, 4, 7 e 12.
