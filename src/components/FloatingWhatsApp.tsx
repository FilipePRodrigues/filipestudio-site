import { whatsappLink } from '../data/content.ts'
import { WhatsAppIcon } from './icons.tsx'

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink('Olá! Vim pelo site e gostaria de um orçamento.')}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Conversar no WhatsApp (abre em nova aba)"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  )
}
