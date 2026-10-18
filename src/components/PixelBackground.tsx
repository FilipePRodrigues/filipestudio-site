const BLOCKS = [
  { top: '8%', left: '6%', size: '7rem', delay: '0s', dur: '9s', tone: 'roxo' },
  { top: '18%', left: '28%', size: '4.5rem', delay: '1.2s', dur: '11s', tone: 'ciano' },
  { top: '6%', left: '52%', size: '9rem', delay: '0.6s', dur: '10s', tone: 'azul' },
  { top: '22%', left: '72%', size: '5.5rem', delay: '2s', dur: '12s', tone: 'roxo' },
  { top: '48%', left: '12%', size: '6rem', delay: '1.6s', dur: '10.5s', tone: 'azul' },
  { top: '58%', left: '42%', size: '3.5rem', delay: '0.3s', dur: '8.5s', tone: 'ciano' },
  { top: '42%', left: '78%', size: '8rem', delay: '2.4s', dur: '11.5s', tone: 'roxo' },
  { top: '72%', left: '22%', size: '5rem', delay: '1s', dur: '9.5s', tone: 'ciano' },
  { top: '80%', left: '60%', size: '6.5rem', delay: '1.8s', dur: '12s', tone: 'azul' },
] as const

const STARS = [
  { top: '12%', left: '18%', delay: '0s' },
  { top: '28%', left: '8%', delay: '0.4s' },
  { top: '8%', left: '40%', delay: '0.8s' },
  { top: '35%', left: '55%', delay: '1.1s' },
  { top: '15%', left: '68%', delay: '0.2s' },
  { top: '44%', left: '30%', delay: '1.5s' },
  { top: '52%', left: '12%', delay: '0.6s' },
  { top: '62%', left: '48%', delay: '1.9s' },
  { top: '70%', left: '80%', delay: '0.9s' },
  { top: '78%', left: '35%', delay: '1.3s' },
  { top: '88%', left: '15%', delay: '0.1s' },
  { top: '92%', left: '58%', delay: '1.7s' },
  { top: '25%', left: '88%', delay: '0.5s' },
  { top: '58%', left: '92%', delay: '1.2s' },
  { top: '40%', left: '4%', delay: '2s' },
] as const

export function PixelBackground({ variant = 'absolute' }: { variant?: 'absolute' | 'site' }) {
  return (
    <div
      className={variant === 'site' ? 'pixel-bg pixel-bg--site' : 'pixel-bg'}
      aria-hidden="true"
    >
      <div className="pixel-bg__blocks">
        {BLOCKS.map((block, index) => (
          <span
            key={index}
            className={`pixel-block pixel-block--${block.tone}`}
            style={{
              top: block.top,
              left: block.left,
              width: block.size,
              height: block.size,
              animationDelay: block.delay,
              animationDuration: block.dur,
            }}
          />
        ))}
      </div>

      <div className="pixel-bg__stars">
        {STARS.map((star, index) => (
          <span
            key={index}
            className="pixel-star"
            style={{ top: star.top, left: star.left, animationDelay: star.delay }}
          />
        ))}
      </div>

      <div className="pixel-bg__grid" />
      <div className="pixel-bg__dither" />
      <div className="pixel-bg__scanlines" />
    </div>
  )
}
