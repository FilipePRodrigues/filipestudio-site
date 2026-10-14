import { useState, type FormEvent } from 'react'
import { BRAND, mailtoLink, whatsappLink } from '../data/content.ts'
import type { ContactFormData, ProjectType } from '../types/index.ts'
import { ArrowRight, MailIcon, WhatsAppIcon } from './icons.tsx'

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
      const firstField = Object.keys(nextErrors)[0]
      document.getElementById(firstField)?.focus()
      return
    }

    const message = buildLeadMessage(form)
    const subject = `Orçamento — ${projectTypeLabel(form.projectType)} — ${form.name}`
    setLeadMessage(message)
    setLeadSubject(subject)
    setSubmitted(true)

    // Abre o WhatsApp com o conteúdo já preenchido
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contato" className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="contato-title">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/[0.06] to-neon-violet/[0.08]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="reveal">
            <p className="text-sm font-semibold uppercase tracking-wider text-neon-cyan">
              Vamos conversar
            </p>
            <h2
              id="contato-title"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
            >
              Pronto para levar o seu projeto para o próximo nível?
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Conte um pouco sobre o que você precisa. Retorno em até 24 horas úteis com uma proposta
              clara, sem compromisso e sem enrolação.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                {
                  title: 'Orçamento gratuito',
                  text: 'Análise do seu projeto sem custo e sem compromisso.',
                },
                {
                  title: 'Resposta rápida',
                  text: 'Retorno em até 24h úteis — geralmente bem antes.',
                },
                {
                  title: 'Atendimento personalizado',
                  text: 'Você fala direto com quem vai desenvolver o projeto.',
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span
                    className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-neon-cyan/15 text-neon-cyan"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink('Olá! Gostaria de solicitar um orçamento para um site.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <WhatsAppIcon />
                Falar no WhatsApp
              </a>
              <a href={`mailto:${BRAND.email}`} className="btn-secondary">
                <MailIcon />
                Enviar e-mail
              </a>
            </div>
          </div>

          <div className="reveal">
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-3xl border border-white/15 p-6 shadow-soft sm:p-8"
              noValidate
              aria-describedby="form-note"
            >
              <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
                Solicite seu orçamento
              </h3>
              <p id="form-note" className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Campos marcados com{' '}
                <span className="text-neon-cyan" aria-hidden="true">
                  *
                </span>
                <span className="sr-only">asterisco</span> são obrigatórios.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label htmlFor="name" className="form-label">
                    Nome completo{' '}
                    <span className="text-neon-cyan" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="form-input"
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

                <div>
                  <label htmlFor="email" className="form-label">
                    E-mail{' '}
                    <span className="text-neon-cyan" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="form-input"
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

                <div>
                  <label htmlFor="whatsapp" className="form-label">
                    WhatsApp
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    autoComplete="tel"
                    className="form-input"
                    placeholder="(31) 9XXXX-XXXX"
                    value={form.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="form-label">
                    Tipo de projeto{' '}
                    <span className="text-neon-cyan" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    className="form-input"
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

                <div>
                  <label htmlFor="message" className="form-label">
                    Conte sobre o projeto{' '}
                    <span className="text-neon-cyan" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="form-input resize-y"
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

              <button type="submit" className="btn-primary mt-6 w-full">
                Enviar solicitação
                <ArrowRight />
              </button>

              <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Ao enviar este formulário, você concorda com o uso dos dados apenas para retorno
                comercial, conforme a{' '}
                <a href="#privacidade" className="underline hover:text-neon-cyan">
                  Política de Privacidade (LGPD)
                </a>
                .
              </p>

              {submitted ? (
                <div
                  id="form-success"
                  className="mt-6 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-4 text-emerald-700 dark:text-emerald-300"
                  role="status"
                  aria-live="polite"
                >
                  <p className="font-semibold">Quase lá! 🎉</p>
                  <p className="mt-1 text-sm">
                    Escolha como enviar a sua mensagem — o conteúdo já está preenchido.
                  </p>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
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
                    className="mt-3 text-sm underline opacity-80 hover:opacity-100"
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
      </div>
    </section>
  )
}
