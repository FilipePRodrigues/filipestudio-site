import { BRAND, NAV_LINKS, SOCIAL_LINKS, whatsappLink } from '../data/content.ts'
import { assetUrl } from '../lib/asset.ts'
import { MailIcon, WhatsAppIcon } from './icons.tsx'
import { StatusClock } from './StatusClock.tsx'

const SERVICE_LINKS = [
  'Sites Institucionais',
  'Landing Pages',
  'Redesign',
  'SEO Técnico',
  'Manutenção',
]

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="chrome-footer" id="privacidade" aria-labelledby="privacidade-title">
      <div className="chrome-footer__inner">
        <div className="chrome-footer__grid">
          <div className="chrome-footer__brand">
            <a href="#topo" className="chrome-footer__logo-link" aria-label="FilipeStudio — início">
              <img
                src={assetUrl('/monogram.svg')}
                alt=""
                width={38}
                height={38}
                className="chrome-footer__logo"
              />
              <span className="chrome-brand__name">
                {BRAND.name}
                <span className="chrome-brand__suffix">{BRAND.nameSuffix}</span>
              </span>
            </a>
            <p className="chrome-footer__desc">
              Sites e landing pages com a sua cara — rápidos, responsivos e pensados pra
              converter. Ideia vira experiência digital que gera resultado.
            </p>
            <div className="chrome-footer__social">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-underline-sweep
                  className="social-link"
                  aria-label={`${social.label} (abre em nova aba)`}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <nav className="chrome-footer__col" aria-label="Navegação">
            <h2 className="kicker chrome-footer__col-title">// navegacao</h2>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#/blog" className="footer-link">
                  Blog ↗
                </a>
              </li>
              <li>
                <a href="#contato" className="footer-link">
                  Contato
                </a>
              </li>
            </ul>
          </nav>

          <nav className="chrome-footer__col" aria-label="Serviços no rodapé">
            <h2 className="kicker chrome-footer__col-title">// servicos</h2>
            <ul>
              {SERVICE_LINKS.map((label) => (
                <li key={label}>
                  <a href="#servicos" className="footer-link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="chrome-footer__col">
            <h2 className="kicker chrome-footer__col-title">// contato</h2>
            <ul>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="footer-link chrome-footer__contact"
                >
                  <MailIcon className="chrome-footer__icon" />
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink('Olá! Vim pelo site e gostaria de um orçamento.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link chrome-footer__contact"
                >
                  <WhatsAppIcon className="chrome-footer__icon" />
                  {BRAND.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="chrome-lgpd">
          <h2 id="privacidade-title">Privacidade &amp; LGPD</h2>
          <p>
            Os dados pessoais coletados neste formulário (nome, e-mail, WhatsApp e mensagem) são
            utilizados exclusivamente para responder à sua solicitação de orçamento e para comunicação
            comercial, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Não
            compartilhamos suas informações com terceiros. Você pode solicitar a correção ou exclusão
            dos seus dados a qualquer momento pelo e-mail{' '}
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
          </p>
        </div>

        <div className="chrome-footer__end">
          <p>
            © <span suppressHydrationWarning>{YEAR}</span> {BRAND.fullName}. Todos os direitos
            reservados.
          </p>
          <div className="chrome-footer__end-links">
            <a href="#privacidade" className="footer-link">
              Política de Privacidade
            </a>
            <a href="#privacidade" className="footer-link">
              Termos de Uso
            </a>
          </div>
          <p className="chrome-footer__eco">// treina · programa · negocia</p>
          {/* FS-011.2 — relógio/status autoral na barra final (decisão 5) */}
          <StatusClock />
          <a href="#topo" className="footer-link chrome-footer__top">
            Voltar ao topo ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
