import { PIXEL_ARTS } from '../data/content.ts'

/**
 * Galeria em espiral estilo Flight (Museum of Motion).
 * O scroll voa a câmera entre as artes; o mouse inclina a cena.
 * Sem WebGL: CSS 3D + GSAP, mais leve e suficiente para 12 posters.
 */
export function PixelGallery() {
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

          <div className="flight__lean" data-flight-lean>
            <div className="flight__scene" data-flight-scene>
              <div className="flight__field" aria-hidden="true">
                {PIXEL_ARTS.map((art, index) => {
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
                {PIXEL_ARTS.map((art) => (
                  <li key={art.id}>{art.alt}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* título fora do espaço 3D, colado no topo com véu */}
          <header className="flight__header">
            <span className="pixel-label">Pixel world</span>
            <h2 className="luxury-title font-display text-2xl font-bold text-white sm:text-3xl">
              Um pouco de mim em pixels
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300 sm:text-base">
              Dev, atleta e criador — a mesma energia que eu levo pros projetos.
            </p>
          </header>
        </div>
      </div>
    </section>
  )
}
