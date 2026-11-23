import { useState, type FormEvent } from 'react'
import { BRAND, mailtoLink, whatsappLink } from '../data/content.ts'
import type { ContactFormData, ProjectType } from '../types/index.ts'
import { LightRays } from './spell/LightRays.tsx'
import { MailIcon, WhatsAppIcon } from './icons.tsx'

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: '', label: 'Selecione uma opção' },
  { value: 'site-institucional', label: 'Site institucional' },
  { value: 'landing-page', label: 'Landing page' },
  { value: 'redesign', label: 'Redesign / otimização' },
  { value: 'manutencao', label: 'Manutenção / suporte' },
  { value: 'outro', label: 'Outro' },
]

const EMPTY_FORM: ContactFormData = {
  name: '',
  email: '',
  whatsapp: '',
  projectType: '',
  message: '',
}

/** Régua mono de 3 colunas de apoio (fase-2 §5.07) — textos reais do inventário. */
const APOIO: { num: string; title: string; text: string }[] = [
  {
    num: '01',
    title: 'Orçamento gratuito',
    text: 'Análise do seu projeto sem custo e sem compromisso.',
  },
  {
    num: '02',
    title: 'Resposta rápida',
    text: 'Retorno em até 24h úteis — geralmente bem antes.',
  },
  {
    num: '03',
    title: 'Papo direto',
    text: 'Você fala com quem vai desenvolver o projeto.',
  },
]

function projectTypeLabel(value: string): string {
  return PROJECT_TYPES.find((option) => option.value === value)?.label ?? value
}

function buildLeadMessage(form: ContactFormData): string {
  return [
    'Olá! Gostaria de solicitar um orçamento pelo site.',
    '',
    `Nome: ${form.name}`,
    `E-mail: ${form.email}`,
    `WhatsApp: ${form.whatsapp || 'Não informado'}`,
    `Tipo de projeto: ${projectTypeLabel(form.projectType)}`,
    '',
    'Mensagem:',
    form.message,
  ].join('\n')
}

type FormErrors = Partial<Record<keyof ContactFormData, string>>

function validate(form: ContactFormData): FormErrors {
  const errors: FormErrors = {}
  if (form.name.trim().length < 2) {
    errors.name = 'Por favor, informe seu nome.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Por favor, informe um e-mail válido.'
  }
  if (!form.projectType) {
    errors.projectType = 'Por favor, selecione o tipo de projeto.'
  }
  if (form.message.trim().length < 10) {
    errors.message = 'Por favor, descreva seu projeto (mínimo 10 caracteres).'
  }
  return errors
}

export function Contact() {
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [leadMessage, setLeadMessage] = useState('')
  const [leadSubject, setLeadSubject] = useState('')

  const updateField = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState('error')
      window.setTimeout(() => setSubmitState('idle'), 600)
      const firstField = Object.keys(nextErrors)[0]
      document.getElementById(firstField)?.focus()
      return
    }

    setSubmitState('loading')
    const message = buildLeadMessage(form)
    const subject = `Orçamento — ${projectTypeLabel(form.projectType)} — ${form.name}`
    setLeadMessage(message)
    setLeadSubject(subject)

    window.setTimeout(() => {
      setSubmitState('success')
      setSubmitted(true)
      window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
    }, 450)
  }

  return (
    <section id="contato" className="contact" aria-labelledby="contato-title">
      {/* feixes da marca (reuso LightRays — sem glow pesado) + véu grad-voile */}
      <LightRays intensity={8} rays={10} position={30} color1="#7C3AED" color2="#22D3EE" />
      <div className="contact__veil" aria-hidden="true" />

      <div className="contact__inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="contact__head reveal">
          <p className="kicker">// contato</p>
          <h2
            id="contato-title"
            className="luxury-title mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            Pronto pra
            <br />
            subir de nível?
          </h2>
          <p className="contact__lead">
            Conta um pouco do que você precisa. Retorno em até 24h úteis com uma proposta
            clara — sem compromisso e sem enrolação.
          </p>
          <p className="micro contact__count">07/08</p>
        </header>

        {/* régua mono de 3 colunas de apoio */}
        <ul className="contact__apoio reveal-stagger">
          {APOIO.map((item) => (
            <li key={item.title} className="contact__apoio-item reveal">
              <span className="contact__apoio-num" aria-hidden="true">
                {item.num}
              </span>
              <h3 className="contact__apoio-title">{item.title}</h3>
              <p className="contact__apoio-text">{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="contact__cta reveal">
          <div className="contact__cta-row">
            <a
              href={whatsappLink('Olá! Gostaria de solicitar um orçamento para um site.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp contact__btn"
            >
              <WhatsAppIcon />
              Falar no WhatsApp
            </a>
            <a href={`mailto:${BRAND.email}`} className="btn-secondary contact__btn">
              <MailIcon />
              Enviar e-mail
            </a>
          </div>
          <p className="micro contact__sla">
            // retorno em até 24h úteis · {BRAND.email} · {BRAND.phoneDisplay}
          </p>
        </div>

        <div className="contact__formwrap reveal">
          <form
            onSubmit={handleSubmit}
            className="contact__form"
            noValidate
            aria-label="Solicite seu orçamento"
            aria-describedby="form-note"
          >
            <h3 className="contact__form-title">Solicite seu orçamento</h3>
            <p id="form-note" className="contact__form-note">
              Campos marcados com{' '}
              <span className="req" aria-hidden="true">
                *
              </span>
              <span className="sr-only">asterisco</span> são obrigatórios.
            </p>

            <div className="contact__fields">
              <div className="contact__field">
                <label htmlFor="name" className="form-label contact__label">
                  ? nome completo{' '}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="form-input contact__input"
                  placeholder="Como devo te chamar?"
                  aria-required="true"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                />
                {errors.name ? (
                  <p className="form-error" id="name-error" role="alert">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="contact__field">
                <label htmlFor="email" className="form-label contact__label">
                  ? e-mail{' '}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="form-input contact__input"
                  placeholder="voce@empresa.com.br"
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
                {errors.email ? (
                  <p className="form-error" id="email-error" role="alert">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="contact__field">
                <label htmlFor="whatsapp" className="form-label contact__label">
                  ? whatsapp
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  className="form-input contact__input"
                  placeholder="(31) 9XXXX-XXXX"
                  value={form.whatsapp}
                  onChange={(e) => updateField('whatsapp', e.target.value)}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="projectType" className="form-label contact__label">
                  ? tipo de projeto{' '}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  className="form-input contact__input contact__select"
                  aria-required="true"
                  aria-invalid={Boolean(errors.projectType)}
                  aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                  value={form.projectType}
                  onChange={(e) => updateField('projectType', e.target.value)}
                >
                  {PROJECT_TYPES.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.value === ''}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.projectType ? (
                  <p className="form-error" id="projectType-error" role="alert">
                    {errors.projectType}
                  </p>
                ) : null}
              </div>

              <div className="contact__field">
                <label htmlFor="message" className="form-label contact__label">
                  ? conte sobre o projeto{' '}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="form-input contact__input contact__textarea"
                  placeholder="Objetivo, prazo, referências... quanto mais detalhes, melhor!"
                  aria-required="true"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                />
                {errors.message ? (
                  <p className="form-error" id="message-error" role="alert">
                    {errors.message}
                  </p>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              className={`btn-primary contact__submit${submitState === 'error' ? ' form-shake' : ''}`}
              disabled={submitState === 'loading'}
              aria-busy={submitState === 'loading'}
            >
              {submitState === 'loading' ? (
                <>
                  <span
                    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    aria-hidden="true"
                  />
                  Enviando...
                </>
              ) : submitState === 'success' ? (
                <>
                  <span aria-hidden="true">✓</span>
                  Pronto
                </>
              ) : (
                <>
                  Enviar <span aria-hidden="true">↩</span>
                </>
              )}
            </button>

            <p className="contact__lgpd">
              Ao enviar este formulário, você concorda com o uso dos dados apenas para retorno
              comercial, conforme a{' '}
              <a href="#privacidade">Política de Privacidade (LGPD)</a>.
            </p>

            {submitted ? (
              <div
                id="form-success"
                className="contact__success"
                role="status"
                aria-live="polite"
              >
                <p className="contact__success-title">Quase lá! 🎉</p>
                <p className="contact__success-text">
                  Escolha como enviar a sua mensagem — o conteúdo já está preenchido.
                </p>
                <div className="contact__success-actions">
                  <a
                    href={whatsappLink(leadMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Enviar no WhatsApp
                  </a>
                  <a href={mailtoLink(leadSubject, leadMessage)} className="btn-secondary">
                    <MailIcon className="h-4 w-4" />
                    Enviar por e-mail
                  </a>
                </div>
                <button
                  type="button"
                  className="contact__success-reset"
                  onClick={() => {
                    setSubmitted(false)
                    setForm(EMPTY_FORM)
                    setLeadMessage('')
                    setLeadSubject('')
                  }}
                >
                  Preencher outro formulário
                </button>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  )
}
