import { PIXEL_ARTS } from '../data/content.ts'

export function Hero() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32"
      aria-labelledby="hero-title"
    >

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <div className="pixel-label">
              <span className="mr-2 inline-block animate-blink" aria-hidden="true">
                ▶
              </span>
              Agenda aberta pra novos projetos
            </div>

            <h1
              id="hero-title"
              className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
            >
              Sites e landing pages que{' '}
              <span className="gradient-text">transformam clique em cliente</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
              Eu crio experiências digitais que posicionam a sua marca e transformam
              clique em cliente — com design que tem personalidade e performance que
              entrega!
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#contato" className="btn-primary">
                Bora conversar
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#portfolio" className="btn-secondary">
                Ver portfólio
              </a>
            </div>
          </div>

          <div className="reveal" aria-hidden="true">
            <div className="hero-stage relative mx-auto w-full max-w-lg">
              <div className="hero-stage__scene">
                {/* lâminas empilhadas — profundidade */}
                <div className="hero-slab hero-slab--far" />
                <div className="hero-slab hero-slab--mid" />

                {/* janela extrudada com a pixel art */}
                <div className="hero-window">
                  <div className="hero-window__top" />
                  <div className="hero-window__side" />
                  <div className="character-frame relative overflow-hidden">
                    <div className="flex items-center gap-2 border-b-2 border-black bg-ink-900 px-4 py-3 dark:border-white/30">
                      <span className="h-3 w-3 border border-black bg-ciano" />
                      <span className="h-3 w-3 border border-black bg-roxo" />
                      <span className="h-3 w-3 border border-black bg-azul" />
                      <div className="ml-3 h-4 flex-1 border border-white/15 bg-white/5" />
                    </div>
                    <div className="relative bg-noite">
                      <div
                        className="absolute inset-0 opacity-50"
                        style={{
                          background:
                            'radial-gradient(ellipse at 30% 20%, rgba(124, 58, 237, 0.45), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(34, 211, 238, 0.3), transparent 50%), radial-gradient(ellipse at 60% 90%, rgba(59, 130, 246, 0.25), transparent 45%)',
                        }}
                      />
                      <img
                        src={PIXEL_ARTS[0].src}
                        alt="Pixel art do Filipe codando — FilipeStudio"
                        width={314}
                        height={418}
                        className="pixel-art relative mx-auto w-[78%] py-4"
                        fetchPriority="high"
                        decoding="async"
                      />
                      <div className="relative flex items-center justify-center gap-2 pb-6">
                        <div className="h-8 w-28 border-2 border-black bg-roxo" />
                        <div className="h-8 w-20 border-2 border-black bg-ciano" />
                        <div className="h-8 w-16 border-2 border-black bg-azul" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* cubos isométricos 3D */}
                <div className="iso-cube iso-cube--a">
                  <div className="iso-cube__face iso-cube__face--front" />
                  <div className="iso-cube__face iso-cube__face--top" />
                  <div className="iso-cube__face iso-cube__face--side" />
                </div>
                <div className="iso-cube iso-cube--b">
                  <div className="iso-cube__face iso-cube__face--front" />
                  <div className="iso-cube__face iso-cube__face--top" />
                  <div className="iso-cube__face iso-cube__face--side" />
                </div>

                {/* blocos pixel */}
                <div className="iso-block iso-block--a animate-float" />
                <div className="iso-block iso-block--b animate-float-delayed" />
                <div className="iso-block iso-block--c animate-float" />

                {/* chips 3D flutuantes */}
                <div className="hero-chip hero-chip--1 animate-float">
                  <span className="text-roxo">⚡</span> PageSpeed 98/100
                </div>
                <div className="hero-chip hero-chip--2 animate-float-delayed">
                  <span className="text-ciano">◆</span> Design exclusivo
                </div>
                <div className="hero-chip hero-chip--3 animate-float">
                  <span className="text-azul">●</span> +38% conversão média
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
