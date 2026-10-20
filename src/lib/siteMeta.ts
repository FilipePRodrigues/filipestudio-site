import { FAQS } from '../data/content.ts'

const SITE_URL = 'https://filipeprodrigues.github.io/filipestudio-site'

export const SITE_META = {
  title: 'FilipeStudio — Sites e Landing Pages que Geram Clientes',
  description:
    'Sites e landing pages em BH e em todo o Brasil. Design exclusivo, performance e SEO técnico do briefing ao deploy. Peça seu orçamento.',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-image.png`,
} as const

export function buildProfessionalServiceJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'FilipeStudio',
    description: SITE_META.description,
    url: SITE_META.url,
    telephone: '+55-31-99799-8171',
    email: 'fprodrigues2908@gmail.com',
    image: SITE_META.image,
    priceRange: 'R$ 2.490+',
    areaServed: { '@type': 'Country', name: 'Brasil' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Belo Horizonte',
      addressRegion: 'MG',
      addressCountry: 'BR',
    },
    founder: {
      '@type': 'Person',
      name: 'Filipe Pinheiro Rodrigues',
      url: SITE_META.url,
    },
    sameAs: [
      'https://github.com/FilipePRodrigues',
      'https://www.linkedin.com/in/filipe-pinheiro-rodrigues-a7281134a/',
      'https://www.instagram.com/lipe___dev/',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços digitais',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Site institucional',
            description: 'Sites institucionais com design exclusivo, SEO técnico e performance.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Landing page',
            description: 'Landing pages focadas em conversão de leads e vendas.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Redesign e SEO técnico',
            description: 'Redesign, otimização de performance e SEO técnico.',
          },
        },
      ],
    },
  })
}

export function buildFaqJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  })
}
