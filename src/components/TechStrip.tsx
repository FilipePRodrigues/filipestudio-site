import { useState } from 'react'
import { TECH_STACK } from '../data/content.ts'

/**
 * TechStrip (FS-010.7 — fusão §5.03): era faixa isolada entre hero e serviços;
 * agora é a régua fina full-bleed no rodapé do bloco Serviços (composição via
 * `App.tsx`, logo após `<Services />`). `TECH_STACK` íntegro (8 tecnologias) em
 * fita mono; a repetição `aria-hidden` existe só para o loop do marquee.
 *
 * Motion: marquee CSS leve com pausa em `:hover`/`:focus-within` e degradação
 * reduced-motion/coarse-pointer (bloco próprio em src/styles/home/servicos.css
 * — o index.css preserva seus 17 blocos de reduced-motion).
 *
 * FS-011.7 · I3b (fidelidade FS-013): o escopo do projeto exige "controles de
 * pausa quando houver animações contínuas relevantes" e a pausa em
 * `:focus-within` era inalcançável por teclado (0 elementos focáveis na fita).
 * Botão de pausa/retomada no canto da fita (aria-label, focus-visible do kit)
 * que alterna `.tech-strip--paused` → `animation-play-state: paused`. A pausa
 * em `:hover`/`:focus-within` e as degradações reduced-motion/mobile seguem
 * intactas (o botão fica oculto quando não há marquee — nada a pausar).
 */
export function TechStrip() {
  const [paused, setPaused] = useState(false)

  return (
    <section
      className={`tech-strip${paused ? ' tech-strip--paused' : ''}`}
      aria-label="Tecnologias e plataformas"
    >
      <button
        type="button"
        className="tech-pause"
        aria-label={
          paused ? 'Retomar animação da fita de tecnologias' : 'Pausar animação da fita de tecnologias'
        }
        onClick={() => setPaused((prev) => !prev)}
      >
        <span aria-hidden="true">{paused ? '▶' : '❚❚'}</span>
      </button>
      <ul className="tech-track">
        {TECH_STACK.map((tech) => (
          <li key={tech.id} className="tech-item">
            {tech.name}
          </li>
        ))}
        {TECH_STACK.map((tech) => (
          <li key={`${tech.id}--loop`} className="tech-item" aria-hidden="true">
            {tech.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
