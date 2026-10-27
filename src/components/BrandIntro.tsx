import { assetUrl } from '../lib/asset.ts'

/**
 * Entrada da marca no home (estilo Luxury / Museum of Motion).
 * Sobreposta e curta: monograma revela, wordmark sobe em máscara, painel sai.
 */
export function BrandIntro() {
  return (
    <div
      className="brand-intro"
      id="brandIntro"
      aria-hidden="true"
      data-brand-intro
    >
      <div className="brand-intro__inner">
        <div className="brand-intro__mark">
          <img
            src={assetUrl('/monogram.svg')}
            alt=""
            width={96}
            height={96}
            data-brand-mark
            decoding="async"
          />
          <span className="brand-intro__ring" data-brand-ring />
        </div>
        <p className="brand-intro__name" data-brand-name>
          <span className="luxury-line">
            <span className="luxury-line__in">Filipe</span>
          </span>
          <span className="luxury-line luxury-line--accent">
            <span className="luxury-line__in">Studio</span>
          </span>
        </p>
        <span className="brand-intro__rule" data-brand-rule />
      </div>
    </div>
  )
}
