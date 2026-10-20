/**
 * Camada de profundidade full-page — orbes suaves e 1 cubo discreto.
 * Tom premium: atmosfera, sem poluição visual.
 */
export function ScrollDepth() {
  return (
    <div className="scroll-depth" aria-hidden="true">
      <div className="scroll-depth__orb scroll-depth__orb--a" data-parallax="0.4" />
      <div className="scroll-depth__orb scroll-depth__orb--b" data-parallax="0.25" />

      <div className="scroll-depth__cube scroll-depth__cube--a" data-parallax="0.35">
        <span /><span /><span />
      </div>
    </div>
  )
}
