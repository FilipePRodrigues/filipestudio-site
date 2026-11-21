import { ShimmerText } from './spell/ShimmerText.tsx'
import { HeroLogo } from './HeroLogo.tsx'

export function Hero() {
  return (
    <section
      id="topo"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-24 pt-28 sm:pb-28 sm:pt-36 lg:pb-32 lg:pt-40"
      aria-labelledby="hero-title"
    >

      <div className="relative mx-auto w-full min-w-0 max-w-7xl overflow-x-clip px-4 sm:px-6 lg:px-8" data-hero-intro>
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <div className="pixel-label" data-hero-part>
              <span className="mr-2 inline-block animate-blink" aria-hidden="true">
                ▶
              </span>
              Agenda aberta pra novos projetos
            </div>

            <h1
              id="hero-title"
              className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
              data-hero-part
            >
              Sites e landing pages que{' '}
              <span className="dark:text-ciano text-roxo">
                <ShimmerText duration={6}>transformam clique em cliente</ShimmerText>
              </span>
            </h1>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg lg:text-xl dark:text-slate-300"
              data-hero-part
            >
              Eu crio experiências digitais que posicionam a sua marca e transformam
              clique em cliente — com design que tem personalidade e performance que
              entrega!
            </p>

            <div
              className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center sm:max-w-none"
              data-hero-part
            >
              <a href="#contato" className="btn-primary w-full sm:w-auto">
                Bora conversar
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#portfolio" className="btn-secondary w-full sm:w-auto">
                Ver portfólio
              </a>
            </div>
          </div>

          <div className="min-w-0" aria-hidden="true" data-hero-part data-parallax="50">
            <div className="hero-stage relative mx-auto w-full max-w-md lg:max-w-lg">
              <div className="hero-stage__scene">
                <div className="hero-logo-wrap">
                  <HeroLogo />
                </div>

                <div className="iso-cube iso-cube--a">
                  <div className="iso-cube__face iso-cube__face--front" />
                  <div className="iso-cube__face iso-cube__face--top" />
                  <div className="iso-cube__face iso-cube__face--side" />
                </div>

                <div className="iso-block iso-block--a animate-float" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scrollhint" id="heroScrollHint" aria-hidden="true">
        <span>Role para continuar</span>
        <div className="hero-scrollhint__line" />
      </div>
    </section>
  )
}
