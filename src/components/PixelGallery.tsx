import { PIXEL_ARTS } from '../data/content.ts'

export function PixelGallery() {
  return (
    <section
      id="pixel-world"
      className="relative overflow-hidden border-y-2 border-black bg-ink-950/85 py-14 dark:border-white/20"
      aria-label="Artes pixel do Filipe"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center">
          <span className="pixel-label">Pixel world</span>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            Um pouco de mim em pixels
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Dev, atleta e criador — a mesma energia que eu levo pros projetos.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto pb-4">
          <ul className="flex min-w-max gap-4 px-2">
            {PIXEL_ARTS.map((art, index) => (
              <li
                key={art.id}
                className="reveal character-frame w-36 shrink-0 overflow-hidden transition-transform duration-150 hover:-translate-y-1 sm:w-40"
              >
                <img
                  src={art.src}
                  alt={art.alt}
                  width={314}
                  height={418}
                  className="pixel-art aspect-[3/4] w-full object-cover object-top"
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
