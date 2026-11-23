import { PIXEL_ARTS } from '../data/content.ts'

type PixelArt = (typeof PIXEL_ARTS)[number]

type PixelGalleryHeader = {
  pixelLabel: string
  title: string
  description: string
}

type PixelGalleryProps = {
  /** Override the header texts (defaults preserve current copy). */
  header?: Partial<PixelGalleryHeader>
  /** Override the list of arts (defaults to PIXEL_ARTS). */
  arts?: readonly PixelArt[]
}

const DEFAULT_HEADER: PixelGalleryHeader = {
  pixelLabel: 'Pixel world',
  title: 'Um pouco de mim em pixels',
  description: 'Dev, atleta e criador — a mesma energia que eu levo pros projetos.',
}

/**
 * Galeria em espiral estilo Flight (Museum of Motion).
 * O scroll voa a câmera entre as artes; o mouse inclina a cena.
 * Sem WebGL: CSS 3D + GSAP, mais leve e suficiente para 12 posters.
 */
export function PixelGallery({ header, arts }: PixelGalleryProps = {}) {
  const resolvedHeader: PixelGalleryHeader = {
    pixelLabel: header?.pixelLabel ?? DEFAULT_HEADER.pixelLabel,
    title: header?.title ?? DEFAULT_HEADER.title,
    description: header?.description ?? DEFAULT_HEADER.description,
  }

  const resolvedArts: readonly PixelArt[] = arts ?? PIXEL_ARTS

  return (
    <section
      id="pixel-world"
      className="flight"
      aria-label="Artes pixel do Filipe"
      data-flight-section
    >
      <div className="flight__track" data-flight-track>
        <div className="flight__viewport" data-flight-viewport>
          {/* túnel circular pixelado */}
          <div className="flight__tunnel" data-flight-tunnel aria-hidden="true">
            <div className="flight__tunnel-rings">
              {Array.from({ length: 8 }, (_, i) => (
                <span
                  key={i}
                  className="flight__ring"
                  style={{ animationDelay: `${i * -0.85}s` }}
                />
              ))}
            </div>
            <div className="flight__tunnel-core" />
            <div className="flight__stars">
              {Array.from({ length: 20 }, (_, i) => (
                <i
                  key={i}
                  style={{
                    left: `${(i * 41) % 100}%`,
                    top: `${(i * 53) % 100}%`,
                    animationDelay: `${(i * 0.4) % 5}s`,
                    animationDuration: `${3 + (i % 4)}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* título primeiro (mobile e desktop) */}
          <header className="flight__header">
            <span className="pixel-label">{resolvedHeader.pixelLabel}</span>
            <h2 className="luxury-title font-display text-2xl font-bold text-white sm:text-3xl">
              {resolvedHeader.title}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300 sm:text-base">
              {resolvedHeader.description}
            </p>
          </header>

          <div className="flight__lean" data-flight-lean>
            <div className="flight__scene" data-flight-scene>
              <div className="flight__field" aria-hidden="true">
                {resolvedArts.map((art, index) => {
                  const golden = index * 137.508
                  const radius = 280 + (index % 3) * 40
                  const z = -index * 340
                  return (
                    <figure
                      key={art.id}
                      className="flight__card"
                      style={{
                        ['--i' as string]: String(index),
                        ['--angle' as string]: `${golden}deg`,
                        ['--radius' as string]: `${radius}px`,
                        ['--z' as string]: `${z}px`,
                      }}
                      data-flight-card
                    >
                      <img
                        src={art.src}
                        alt={index === 0 ? art.alt : ''}
                        width={314}
                        height={418}
                        className="pixel-art"
                        loading={index < 4 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </figure>
                  )
                })}
              </div>

              <ul className="sr-only">
                {resolvedArts.map((art) => (
                  <li key={art.id}>{art.alt}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
