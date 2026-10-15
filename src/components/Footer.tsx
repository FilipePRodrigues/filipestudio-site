import { BRAND, NAV_LINKS, SOCIAL_LINKS, whatsappLink } from '../data/content.ts'
import { assetUrl } from '../lib/asset.ts'
import { MailIcon, WhatsAppIcon } from './icons.tsx'

const SERVICE_LINKS = [
  'Sites Institucionais',
  'Landing Pages',
  'Redesign',
  'SEO Técnico',
  'Manutenção',
]

export function Footer() {
  return (
    <footer
      className="border-t border-slate-200/80 bg-white/50 dark:border-white/10 dark:bg-ink-950/50"
      id="privacidade"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#topo" className="inline-flex items-center gap-2.5">
              <img
                src={assetUrl('/monogram.svg')}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-xl"
              />
              <span className="font-display text-lg font-semibold tracking-tight">
                {BRAND.name}
                <span className="bg-gradient-to-r from-neon-cyan to-neon-violet bg-clip-text text-transparent">
                  {BRAND.nameSuffix}
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Criação de sites e landing pages modernos, rápidos e pensados para converter.
              Transformo ideias em experiências digitais que geram resultado.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`${social.label} (abre em nova aba)`}
                >
                  {social.id === 'linkedin' ? (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ) : social.id === 'instagram' ? (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Links do rodapé">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Navegação
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contato" className="footer-link">
                  Contato
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Serviços no rodapé">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Serviços
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICE_LINKS.map((label) => (
                <li key={label}>
                  <a href="#servicos" className="footer-link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Contato
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href={`mailto:${BRAND.email}`} className="footer-link inline-flex items-center gap-2">
                  <MailIcon className="h-4 w-4" />
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink('Olá! Vim pelo site e gostaria de um orçamento.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link inline-flex items-center gap-2"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {BRAND.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 text-xs leading-relaxed text-slate-500 dark:border-white/10 dark:bg-ink-900/60 dark:text-slate-400">
          <h2 className="font-display text-sm font-semibold text-slate-700 dark:text-slate-200">
            Privacidade & LGPD
          </h2>
          <p className="mt-2">
            Os dados pessoais coletados neste formulário (nome, e-mail, WhatsApp e mensagem) são
            utilizados exclusivamente para responder à sua solicitação de orçamento e para comunicação
            comercial, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Não
            compartilhamos suas informações com terceiros. Você pode solicitar a correção ou exclusão
            dos seus dados a qualquer momento pelo e-mail{' '}
            <a href={`mailto:${BRAND.email}`} className="underline hover:text-neon-cyan">
              {BRAND.email}
            </a>
            .
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400 sm:flex-row">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {BRAND.fullName}. Todos
            os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#privacidade" className="footer-link">
              Política de Privacidade
            </a>
            <a href="#privacidade" className="footer-link">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
