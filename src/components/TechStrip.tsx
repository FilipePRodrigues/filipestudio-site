import { TECH_STACK } from '../data/content.ts'

export function TechStrip() {
  const items = [...TECH_STACK, ...TECH_STACK]
  return (
    <section
      className="border-y-2 border-black bg-white/80 py-10 backdrop-blur-[2px] dark:border-white/20 dark:bg-ink-900/75"
      aria-label="Tecnologias e plataformas"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center font-pixel text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Stack e ferramentas que domino
        </p>
        <div className="mt-6 overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-10">
            {items.map((tech, index) => (
              <span key={`${tech.id}-${index}`} className="tech-chip">
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
