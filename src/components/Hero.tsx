import { ShimmerText } from './spell/ShimmerText.tsx'
import { HeroLogo } from './HeroLogo.tsx'
import { PIXEL_ARTS } from '../data/content.ts'

export type HeroProps = {
  agendaText?: string
  titlePrefix?: string
  titleHighlight?: string
  introText?: string
  primaryCtaText?: string
  secondaryCtaText?: string
  shimmerDuration?: number
}

export function Hero({
  agendaText = 'Agenda aberta pra novos projetos',
  titlePrefix = 'Sites e landing pages que',
  titleHighlight = 'transformam clique em cliente',
  introText =
    'Eu crio experiências digitais que posicionam a sua marca e transformam clique em cliente — com design que tem personalidade e performance que entrega!',
  primaryCtaText = 'Bora conversar',
  secondaryCtaText = 'Ver portfólio',
  shimmerDuration = 6,
}: HeroProps = {}) {
  // FS-010.5 · composição A (7/5) aprovada — docs/fase-2-direcao-criativa.md §5/01.
  // Quebra editorial do protótipo: a última palavra do prefixo fecha a linha 2 do
  // bicolor ("Sites e landing pages" / "que transformam clique em cliente") — o
  // texto renderizado permanece idêntico ao conteúdo real dos defaults.
  const prefix = titlePrefix.trim()
  const cut = prefix.lastIndexOf(' ')
  const head = cut > 0 ? prefix.slice(0, cut) : prefix
  const tail = cut > 0 ? prefix.slice(cut + 1) : ''
  const fig = PIXEL_ARTS[0]

  return (
    <section id="topo" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner" data-hero-intro>
        <div className="hero__grid">
          {/* ── coluna de texto (7) ───────────────────────────────────── */}
          <div className="hero__copy">
            <div className="hero__meta" data-hero-part>
              <p className="kicker hero__kicker">// filipe studio · bh, br</p>
              <p className="hero__agenda">
                <span className="hero__agenda-play" aria-hidden="true">
                  ▸
                </span>{' '}
                {agendaText}
              </p>
            </div>

            <h1 id="hero-title" className="hero__title luxury-title" data-hero-part>
              {head}
              <br />
              {/* espaço inicial dentro do span: o split do setupTitleMasks faz trim
                  por linha e removeria o espaço entre as duas linhas do bicolor */}
              <ShimmerText className="hero__title-accent" duration={shimmerDuration}>
                {' '}
                {tail ? `${tail} ` : ''}
                {titleHighlight}
              </ShimmerText>
            </h1>

            <p className="hero__lead" data-hero-part>
              {introText}
            </p>

            <div className="hero__actions" data-hero-part>
              <div className="hero__cta-row">
                <a href="#contato" className="btn-primary hero__btn">
                  {primaryCtaText}
                  <svg
                    className="hero__btn-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="#portfolio" className="btn-secondary hero__btn">
                  {secondaryCtaText}
                </a>
              </div>

              <ul className="hero__chips" aria-label="Filipe Studio">
                <li>// treina</li>
                <li>// programa</li>
                <li>// negocia</li>
              </ul>
            </div>
          </div>

          {/* ── palco visual (5) ─────────────────────────────────────── */}
          <div className="hero__stagewrap" data-hero-part data-parallax="65">
            <div className="hero-stage">
              <div className="hero-stage__glow" aria-hidden="true" />
              <div className="hero-stage__scene">
                <HeroLogo />
                <div className="hero-stage__cube" aria-hidden="true" />
                <figure className="hero-stage__fig">
                  <div className="hero-stage__frame">
                    <img
                      src={fig.src}
                      alt={fig.alt}
                      width={314}
                      height={418}
                      loading="eager"
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                  <figcaption className="fig">fig. 01 · codando</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scrollhint" id="heroScrollHint" aria-hidden="true">
        <span>↓ role para continuar</span>
        <div className="hero-scrollhint__line" />
      </div>
    </section>
  )
}
