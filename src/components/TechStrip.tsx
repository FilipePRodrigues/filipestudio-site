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
 */
export function TechStrip() {
  return (
    <section className="tech-strip" aria-label="Tecnologias e plataformas">
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
