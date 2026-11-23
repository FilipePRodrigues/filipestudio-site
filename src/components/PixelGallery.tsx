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
  pixelLabel: '// pixel gallery',
  title: 'Um pouco de mim em pixels',
  description: 'Dev, atleta e criador — a mesma energia que eu levo pros projetos.',
}

/**
 * Legendas `fig. NN ·` da prancha (fase-2 §6 — "prancha de catálogo técnico").
 * Ordem idêntica a `PIXEL_ARTS` (content.ts intocado).
 */
const FIG_LABELS = [
  'codando',
  'treinando',
  'negociando',
  'correndo',
  'pensando',
  'apontando',
  'setup_codigo',
  'viagem',
  'planejando',
  'comemorando',
  'lifestyle',
  'headphone',
] as const

/**
 * Prancha de figuras estática (FS-010.8 — aposentadoria do Flight, plano §1.3).
 * 12 `figure` catalogadas `fig. 01 · codando` … `fig. 12 · headphone`, cada
 * frame com `data-image-reveal` (contrato motion §3.5). SEM `[data-flight-section]`:
 * a câmera 3D (`setupFlightScene`) foi removida de `motion.ts`.
 */
export function PixelGallery({ header, arts }: PixelGalleryProps = {}) {
  const resolvedHeader: PixelGalleryHeader = {
    pixelLabel: header?.pixelLabel ?? DEFAULT_HEADER.pixelLabel,
    title: header?.title ?? DEFAULT_HEADER.title,
    description: header?.description ?? DEFAULT_HEADER.description,
  }

  const resolvedArts: readonly PixelArt[] = arts ?? PIXEL_ARTS

  return (
    <section id="pixel-world" className="prancha" aria-label="Artes pixel do Filipe">
      <header className="prancha__head">
        <div className="min-w-0">
          <p className="kicker">{resolvedHeader.pixelLabel}</p>
          <h3 className="prancha__title">{resolvedHeader.title}</h3>
          <p className="prancha__sub">{resolvedHeader.description}</p>
        </div>
        <p className="micro prancha__count">// 12 figuras · catálogo pessoal</p>
      </header>

      <div className="prancha__grid">
        {resolvedArts.map((art, index) => (
          <figure key={art.id} className="prancha__frame" data-image-reveal>
            <img
              src={art.src}
              alt={art.alt}
              width={314}
              height={418}
              loading={index < 4 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <figcaption className="fig">
              {`fig. ${String(index + 1).padStart(2, '0')} · ${FIG_LABELS[index] ?? art.id}`}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
