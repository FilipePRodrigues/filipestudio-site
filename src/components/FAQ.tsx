import { useState } from 'react'
import { FAQS } from '../data/content.ts'

/**
 * FAQ (FS-011.4 — protótipo 06B, fase-2 §5.06): bloco B do capítulo "decisão".
 * Kicker `// duvidas frequentes` + H2 bicolor "Antes de fechar," / "as respostas."
 * (padrão do kit: texto + `<br>` sob `.luxury-title` — o split do
 * `setupTitleMasks` exige texto puro por linha, nunca spans de linha) +
 * acordeão com os 6 `FAQS` reais (linha `?` mono + pergunta `<h3>`).
 *
 * Comportamento (contrato FS-011.4): 1 item aberto por vez — abrir fecha os
 * demais; clicar no item aberto fecha tudo (comportamento do protótipo).
 * `aria-expanded`/`aria-controls` por botão; teclado nativo de `<button>`
 * (Enter/Espaço); painel `role="region"` + `hidden` quando fechado.
 *
 * Textos vindos de `FAQS` (src/data/content.ts — intocado): mesma fonte do
 * JSON-LD `FAQPage` (siteMeta.ts), garantindo sync palavra a palavra.
 *
 * Contratos preservados (docs/home-dom-contract.md §2):
 * - `section#faq` + `aria-labelledby="faq-title"`;
 * - `h2#faq-title.luxury-title` (texto + `<br>`);
 * - `.reveal` no cabeçalho e nos itens (scroll reveal do motion.ts).
 */
export function FAQ() {
  // protótipo: o primeiro item já nasce aberto
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null)

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="faq__mark" aria-hidden="true" />
        <header className="faq__head reveal">
          <div className="min-w-0">
            <p className="kicker">// duvidas frequentes</p>
            <h2 id="faq-title" className="luxury-title faq__title">
              Antes de fechar,
              <br />
              as respostas.
            </h2>
          </div>
          <p className="micro faq__count">// abre uma por vez</p>
        </header>

        <div className="faq-list">
          {FAQS.map((item, index) => {
            const n = index + 1
            const questionId = `faq-q-${n}`
            const panelId = `faq-a-${n}`
            const isOpen = openId === item.id

            return (
              // className ESTÁTICO por contrato (FS-019): o React reescreve o
              // atributo `class` inteiro sempre que o valor do prop muda — e a
              // string do prop NÃO contém `is-visible`, que é injetado por fora
              // pelo IntersectionObserver (useScrollReveal). Qualquer classe
              // condicional aqui apagaria o reveal e deixaria o item com
              // opacity:0 ocupando espaço (bug do acordeão "sumindo" ao clicar).
              // Estado aberto é lido do atributo `hidden` do painel (a11y), não
              // de uma classe no item — ver faq.css `.faq-a:not([hidden])`.
              <div key={item.id} className="faq-item reveal">
                <button
                  type="button"
                  className="faq-q"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                >
                  <span className="qmark" aria-hidden="true">
                    ?
                  </span>
                  <h3>{item.question}</h3>
                  <span className="chev" aria-hidden="true">
                    +
                  </span>
                </button>
                <div
                  className="faq-a"
                  id={panelId}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!isOpen}
                >
                  {item.answer}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
