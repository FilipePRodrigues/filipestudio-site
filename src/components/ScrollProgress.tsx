/** Indicador de progresso de rolagem — barra extrudada 3D. */
export function ScrollProgress() {
  return (
    <div className="scroll-progress" aria-hidden="true" data-active="false">
      <div className="scroll-progress__track">
        <div className="scroll-progress__fill" />
      </div>
      <div className="scroll-progress__orb" />
    </div>
  )
}
