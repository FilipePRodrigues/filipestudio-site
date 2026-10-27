import { useId, useState } from 'react'
import { FAQS } from '../data/content.ts'

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)
  const baseId = useId()

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section id="faq" className="relative py-20 sm:py-28" aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center">
          <span className="pixel-label">FAQ</span>
          <h2
            id="faq-title"
            className="luxury-title mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            Tire suas dúvidas
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Não achou o que precisava? Chama no formulário ou no WhatsApp.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {FAQS.map((item) => {
            const panelId = `${baseId}-${item.id}-panel`
            const buttonId = `${baseId}-${item.id}-button`
            const isOpen = openId === item.id

            return (
              <div key={item.id} className="faq-item reveal">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="faq-panel"
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
