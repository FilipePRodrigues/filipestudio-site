import { useEffect, useState } from 'react'

/**
 * FS-011.2 — relógio/status autoral `● bh, br · hh:mm` (decisão 5 de
 * `decisoes-aprovadas.md`).
 *
 * - fuso fixo `America/Sao_Paulo` via `Intl.DateTimeFormat` (sem dependência
 *   nova de pacote);
 * - atualiza por minuto com `setInterval` (sem rAF); o primeiro tick é alinhado
 *   ao início do minuto seguinte para o mostrador não ficar um minuto defasado;
 * - `aria-hidden="true"`: é detalhe autoral decorativo, não informação
 *   essencial para leitores de tela.
 */

const TIME_ZONE = 'America/Sao_Paulo'
const MINUTE_MS = 60_000

const timeFormat = new Intl.DateTimeFormat('pt-BR', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

function formatClockTime(date: Date): string {
  return timeFormat.format(date)
}

export function StatusClock() {
  const [time, setTime] = useState(() => formatClockTime(new Date()))

  useEffect(() => {
    const tick = () => setTime(formatClockTime(new Date()))
    let intervalId = 0
    // alinha o primeiro tick ao início do minuto seguinte…
    const timeoutId = window.setTimeout(() => {
      tick()
      // …e daí em diante atualiza uma vez por minuto
      intervalId = window.setInterval(tick, MINUTE_MS)
    }, MINUTE_MS - (Date.now() % MINUTE_MS))

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <p className="micro" aria-hidden="true">
      ● bh, br · {time}
    </p>
  )
}
