import { assetUrl } from '../lib/asset.ts'

/**
 * Filenames in public/pixel/icons are legacy labels and do NOT match content.
 * This map uses the real visual of each PNG (verified).
 */
const ICON_FILES: Record<string, string> = {
  // tech / product
  code: '27_globo.webp', // </>
  editor: '29_camera.webp', // code editor screen
  browser: '28_mapa.webp', // website UI
  devices: '09_halter.webp', // laptop + phones (tech stack)
  gear: '03_mochila.webp', // keyboard + mouse + headset
  coding: '02_moletom.webp', // laptop + dual monitors coding
  cursor: '30_mala.webp', // mouse cursor
  wifi: '31_passaporte.webp', // wifi signal
  // results / business
  target: '35_caneca.webp', // dartboard
  growth: '12_shaker.webp', // chart with arrow
  chart: '32_cidade.webp', // bar chart
  money: '11_tenis.webp', // dollar sign
  trophy: '37_marmita.webp', // winner cup
  idea: '34_praia.webp', // lightbulb
  battery: '33_montanhas.webp', // battery
  // lifestyle
  coffee: '19_celular.webp', // mug with crown
  headphones: '26_aviao.webp', // earbuds
  remote: '25_aperto_maos.webp', // media remote
  // fallbacks
  monitores: '02_moletom.webp',
  celular: '28_mapa.webp',
  grafico: '32_cidade.webp',
  teclado: '03_mochila.webp',
  globo: '27_globo.webp',
  aperto_maos: '31_passaporte.webp',
  mouse: '30_mala.webp',
  camera: '29_camera.webp',
  relogio: '35_caneca.webp',
}

export function PixelIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const file = ICON_FILES[name] ?? ICON_FILES.browser
  return (
    <img
      src={assetUrl(`/pixel/icons/${file}`)}
      alt=""
      width={64}
      height={64}
      className={className ?? 'pixel-art h-full w-full object-contain scale-[1.15]'}
      loading="lazy"
      decoding="async"
      aria-hidden="true"
    />
  )
}
