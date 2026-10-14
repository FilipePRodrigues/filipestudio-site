import { useCounter } from '../hooks/useCounter.ts'
import { assetUrl } from '../lib/asset.ts'

function Stat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { value, ref } = useCounter(target)
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-2xl font-bold text-slate-900 dark:text-white">
        <span ref={ref}>{value}</span>
        {suffix}
      </dd>
      <dd className="text-sm text-slate-500 dark:text-slate-400">{label}</dd>
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32"
      aria-labelledby="hero-title"
    >
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="grid-overlay" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1.5 text-xs font-medium text-neon-cyan">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
              </span>
              Agenda aberta para novos projetos
            </div>

            <h1
              id="hero-title"
              className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
            >
              Sites e landing pages que{' '}
              <span className="gradient-text">transformam visitantes em clientes</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
              Design futurista, performance de ponta e estratégias de conversão sob medida.
              Eu crio experiências digitais que posicionam a sua marca e geram resultados reais — do
              primeiro clique ao fechamento.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#contato" className="btn-primary">
                Solicite um orçamento
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#portfolio" className="btn-secondary">
                Ver portfólio
              </a>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              <Stat target={120} suffix="+" label="Projetos entregues" />
              <Stat target={98} suffix="%" label="Clientes satisfeitos" />
              <Stat target={24} suffix="h" label="Resposta média" />
            </dl>
          </div>

          <div className="reveal" aria-hidden="true">
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-neon-cyan/30 via-neon-blue/20 to-neon-violet/30 blur-2xl animate-pulse-soft" />

              <div className="glass-card relative overflow-hidden rounded-3xl border border-white/15 p-2 shadow-glow">
                <div className="flex items-center gap-2 rounded-t-2xl bg-white/5 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <div className="ml-3 h-6 flex-1 rounded-full bg-white/10" />
                </div>
                <div className="relative overflow-hidden rounded-b-2xl bg-[#0b0b1f]">
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      background:
                        'radial-gradient(ellipse at 30% 20%, rgba(124,58,237,0.35), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(34,211,238,0.25), transparent 50%)',
                    }}
                  />
                  <img
                    src={assetUrl('/logo-horizontal.png')}
                    alt="FilipeStudio — Sites, landing pages e soluções digitais"
                    className="relative mx-auto w-[90%] py-8"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="relative flex items-center justify-center gap-2 pb-6">
                    <div className="h-8 w-28 rounded-lg bg-gradient-to-r from-neon-violet via-neon-blue to-neon-cyan" />
                    <div className="h-8 w-20 rounded-lg border border-white/15" />
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 top-10 animate-float rounded-2xl border border-white/15 bg-white/80 px-4 py-2.5 text-xs font-semibold shadow-soft backdrop-blur-md dark:bg-ink-800/80">
                <span className="text-neon-cyan">⚡</span> PageSpeed 98/100
              </div>
              <div className="absolute -right-2 top-1/3 animate-float-delayed rounded-2xl border border-white/15 bg-white/80 px-4 py-2.5 text-xs font-semibold shadow-soft backdrop-blur-md dark:bg-ink-800/80">
                <span className="text-neon-violet">◆</span> Design exclusivo
              </div>
              <div className="absolute -bottom-4 left-8 animate-float rounded-2xl border border-white/15 bg-white/80 px-4 py-2.5 text-xs font-semibold shadow-soft backdrop-blur-md dark:bg-ink-800/80">
                <span className="text-emerald-400">●</span> +38% conversão média
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
