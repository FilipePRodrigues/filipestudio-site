import { assetUrl } from '../lib/asset.ts'
import type {
  Benefit,
  FaqItem,
  PortfolioItem,
  PricingTier,
  ProcessStep,
  Service,
  TechItem,
  Testimonial,
} from '../types/index.ts'

export const BRAND = {
  name: 'Filipe',
  nameSuffix: 'Studio',
  fullName: 'FilipeStudio',
  tagline: 'Sites, landing pages e soluções digitais',
  email: 'fprodrigues2908@gmail.com',
  phoneDisplay: '(31) 99799-8171',
  whatsappNumber: '5531997998171',
  cnpj: '00.000.000/0001-00',
  baseUrl: 'https://filipeprodrigues.github.io/filipestudio-site/',
} as const

export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message)
  return `https://wa.me/${BRAND.whatsappNumber}?text=${text}`
}

export function mailtoLink(subject: string, body: string): string {
  return `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const NAV_LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#processo', label: 'Processo' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#planos', label: 'Planos' },
  { href: '#faq', label: 'FAQ' },
] as const

export const SERVICES: Service[] = [
  {
    id: 'institucionais',
    title: 'Sites Institucionais',
    description:
      'Presença digital profissional que transmite confiança. Estrutura clara, identidade visual forte e otimizada para Google desde o dia zero.',
    icon: 'layout',
    bullets: [
      'Design alinhado à sua marca',
      'Responsivo em todos os dispositivos',
      'Formulários e integrações',
    ],
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages de Alta Conversão',
    description:
      'Páginas focadas em um único objetivo: converter. Copy persuasiva, CTAs estratégicos e testes para maximizar cada visita.',
    icon: 'sparkles',
    bullets: [
      'Arquitetura orientada a conversão',
      'Integração com CRM e anúncios',
      'Velocidade e performance otimizadas',
    ],
  },
  {
    id: 'one-page',
    title: 'Sites One Page & Portfólio',
    description:
      'Presença enxuta e elegante em uma única página. Ideal para profissionais, criadores e projetos que precisam existir online com agilidade.',
    icon: 'page',
    bullets: [
      'Estrutura clara e objetiva',
      'Entrega rápida',
      'Perfeito para portfólio e bio link',
    ],
  },
  {
    id: 'redesign',
    title: 'Redesign & Otimização',
    description:
      'Seu site está desatualizado ou não converte? Redesenho completo com foco em UX, velocidade e resultados mensuráveis.',
    icon: 'pen',
    bullets: ['Auditoria de UX e performance', 'Modernização visual', 'Migração sem downtime'],
  },
  {
    id: 'seo',
    title: 'SEO Técnico',
    description:
      'Estrutura semântica, Core Web Vitals, dados estruturados e boas práticas on-page para o seu site ranquear e ser encontrado.',
    icon: 'search',
    bullets: ['Auditoria técnica completa', 'Schema.org e meta tags', 'Relatórios de indexação'],
  },
  {
    id: 'manutencao',
    title: 'Manutenção & Suporte',
    description:
      'Seu site sempre atualizado, seguro e no ar. Planos contínuos de manutenção, backups e suporte prioritário.',
    icon: 'shield',
    bullets: ['Atualizações e correções', 'Monitoramento e backups', 'Alterações sob demanda'],
  },
]

export const BENEFITS: Benefit[] = [
  {
    id: 'performance',
    title: 'Performance real',
    description:
      'Carregamento em segundos. Core Web Vitals no verde para não perder clientes e ranquear melhor.',
    icon: '⚡',
  },
  {
    id: 'responsivo',
    title: '100% responsivo',
    description:
      'Experiência impecável do celular ao desktop. A maioria dos seus clientes acessa pelo mobile.',
    icon: '📱',
  },
  {
    id: 'seo',
    title: 'SEO desde o início',
    description:
      'Semântica, metadados e estrutura pensados para o Google entender e premiar o seu conteúdo.',
    icon: '🔍',
  },
  {
    id: 'design',
    title: 'Design exclusivo',
    description:
      'Nada de template pronto. Identidade visual única que diferencia a sua marca da concorrência.',
    icon: '🎨',
  },
  {
    id: 'prazos',
    title: 'Prazos cumpridos',
    description:
      'Cronograma transparente e comunicação constante. Você sabe exatamente em que etapa estamos.',
    icon: '⏱️',
  },
  {
    id: 'suporte',
    title: 'Suporte contínuo',
    description:
      'Não entrego e sumo. Acompanho o lançamento e fico disponível para evoluir o projeto.',
    icon: '🛡️',
  },
]

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'briefing',
    step: '01',
    title: 'Briefing',
    description:
      'Conversamos sobre objetivos, público, concorrentes e prazos. Entendo o seu negócio a fundo antes de qualquer pixel.',
  },
  {
    id: 'design',
    step: '02',
    title: 'Design',
    description:
      'Crio o wireframe e o layout visual alinhado à sua identidade. Você aprova cada etapa antes de avançarmos.',
  },
  {
    id: 'dev',
    step: '03',
    title: 'Desenvolvimento',
    description:
      'Código limpo, performático e responsivo. Integrações, formulários, SEO técnico e testes em múltiplos dispositivos.',
  },
  {
    id: 'entrega',
    step: '04',
    title: 'Entrega & Suporte',
    description:
      'Publicação, treinamento de uso e acompanhamento pós-lançamento. Seguimos juntos para evoluir o resultado.',
  },
]

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 'filipestudio',
    category: 'Landing Page',
    title: 'FilipeStudio',
    description:
      'Landing page institucional com identidade neon, planos, portfólio e captação de leads via WhatsApp e e-mail.',
    emoji: '⚡',
    gradient: 'from-violet-500/40 via-blue-500/30 to-cyan-400/40',
    href: 'https://filipeprodrigues.github.io/filipestudio-site/',
    image: assetUrl('/portfolio-filipestudio.webp'),
  },
  {
    id: 'saas',
    category: 'Landing Page',
    title: 'Startup de Tecnologia',
    description: 'Landing page de captação com +42% de conversão em campanhas pagas.',
    emoji: '🚀',
    gradient: 'from-cyan-400/40 via-blue-500/30 to-violet-500/40',
  },
  {
    id: 'moda',
    category: 'Loja Virtual',
    title: 'Moda & Lifestyle',
    description: 'Redesign completo com checkout otimizado e +28% no ticket médio.',
    emoji: '🛍️',
    gradient: 'from-violet-400/40 via-fuchsia-500/30 to-pink-500/40',
  },
  {
    id: 'clinica',
    category: 'Institucional',
    title: 'Clínica de Saúde',
    description: 'Presença digital completa com agendamento online e SEO local.',
    emoji: '🏥',
    gradient: 'from-emerald-400/40 via-teal-500/30 to-cyan-500/40',
  },
  {
    id: 'restaurante',
    category: 'Redesign',
    title: 'Gastronomia Premium',
    description: 'Site moderno com cardápio digital e reservas integradas ao WhatsApp.',
    emoji: '🍽️',
    gradient: 'from-amber-400/40 via-orange-500/30 to-red-500/40',
  },
  {
    id: 'curso',
    category: 'Landing Page',
    title: 'Curso Online',
    description: 'Página de vendas com copy persuasiva e checkout em um clique.',
    emoji: '📚',
    gradient: 'from-sky-400/40 via-indigo-500/30 to-purple-500/40',
  },
  {
    id: 'agencia',
    category: 'Institucional + Blog',
    title: 'Consultoria de Marketing',
    description: 'Site completo com blog, captação de leads e área de materiais ricos.',
    emoji: '✨',
    gradient: 'from-rose-400/40 via-pink-500/30 to-fuchsia-500/40',
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ana',
    quote:
      'O site ficou acima do que eu imaginava. Profissionalismo do início ao fim e o prazo foi cumprido à risca. Já indiquei para três colegas!',
    name: 'Ana Souza',
    role: 'CEO, Startup Tech',
    initials: 'AS',
    avatarGradient: 'from-neon-cyan to-neon-blue',
    rating: 5,
  },
  {
    id: 'carlos',
    quote:
      'Nossa landing page triplicou a captação de leads em dois meses. Entende de negócio, não só de código. Recomendo sem reservas.',
    name: 'Carlos Mendes',
    role: 'Diretor de Marketing',
    initials: 'CM',
    avatarGradient: 'from-neon-violet to-neon-magenta',
    rating: 5,
  },
  {
    id: 'juliana',
    quote:
      'Processo transparente, comunicação clara e um resultado lindo. Minha landing page ficou rápida e os leads aumentaram desde o lançamento.',
    name: 'Juliana Rocha',
    role: 'Fundadora, Marca de Lifestyle',
    initials: 'JR',
    avatarGradient: 'from-emerald-400 to-teal-400',
    rating: 5,
  },
]

export const METRICS = [
  { id: 'projects', value: 120, suffix: '+', label: 'Projetos entregues' },
  { id: 'conversion', value: 38, suffix: '%', label: 'Aumento médio de conversão' },
  { id: 'satisfaction', value: 98, suffix: '%', label: 'Índice de satisfação' },
  { id: 'rating', value: 5, suffix: '★', label: 'Avaliação média' },
] as const

export const PRICING: PricingTier[] = [
  {
    id: 'essencial',
    name: 'Essencial',
    description: 'Ideal para quem está começando a presença digital.',
    priceLabel: 'R$ 2.490',
    priceNote: 'a partir de',
    featured: false,
    features: [
      'Até 5 páginas',
      'Design responsivo',
      'Formulário de contato',
      'SEO básico',
      'Entrega em até 15 dias',
    ],
    ctaLabel: 'Solicitar proposta',
  },
  {
    id: 'profissional',
    name: 'Profissional',
    description: 'Perfeito para empresas que querem gerar leads consistentemente.',
    priceLabel: 'Sob consulta',
    priceNote: 'orçamento',
    featured: true,
    features: [
      'Até 12 páginas',
      'Design exclusivo',
      'SEO técnico completo',
      'Formulários e WhatsApp',
      'Suporte por 60 dias',
    ],
    ctaLabel: 'Solicitar proposta',
  },
]

export const FAQS: FaqItem[] = [
  {
    id: 'tempo',
    question: 'Quanto tempo leva para desenvolver um site?',
    answer:
      'Depende da complexidade. Uma landing page pode ficar pronta em 7 a 10 dias úteis. Sites institucionais levam em média 2 a 4 semanas. Projetos customizados geralmente de 4 a 8 semanas. Você recebe um cronograma detalhado após o briefing.',
  },
  {
    id: 'pagamento',
    question: 'Como funciona o processo de pagamento?',
    answer:
      'Trabalho com pagamento em etapas: normalmente 40% na aprovação do orçamento, 30% na entrega do design e 30% na publicação do site. Aceito Pix, transferência e cartão. Para projetos maiores, podemos combinar um plano de pagamento personalizado.',
  },
  {
    id: 'responsivo',
    question: 'O site será responsivo e otimizado para celulares?',
    answer:
      'Com certeza. Todo projeto é desenvolvido com abordagem mobile-first e testado em múltiplos dispositivos e navegadores. A experiência no celular é prioridade — afinal, é de lá que vem a maior parte do tráfego.',
  },
  {
    id: 'conteudo',
    question: 'Vocês fazem o conteúdo e os textos?',
    answer:
      'Posso ajudar com copy orientada a conversão e estrutura de conteúdo. Se preferir, também trabalho em parceria com redatores especializados. O ideal é que você traga os materiais da marca (textos, fotos, logos) — e eu cuido da tradução disso em uma experiência digital poderosa.',
  },
  {
    id: 'suporte',
    question: 'Vocês oferecem suporte após a entrega?',
    answer:
      'Sim. Todos os planos incluem um período de suporte pós-lançamento (de 30 a 90 dias, conforme o plano) para correções e ajustes. Também ofereço planos mensais de manutenção com atualizações, backups e alterações sob demanda.',
  },
  {
    id: 'atendimento',
    question: 'Vocês atendem clientes de todo o Brasil?',
    answer:
      'Sim! Trabalho 100% remoto com clientes de qualquer lugar do Brasil e também do exterior. Toda a comunicação acontece por WhatsApp, e-mail e videochamadas — de forma clara e organizada.',
  },
]

export const TECH_STACK: TechItem[] = [
  { id: 'tailwind', name: 'Tailwind CSS' },
  { id: 'css', name: 'CSS' },
  { id: 'html', name: 'HTML' },
  { id: 'js', name: 'JavaScript' },
  { id: 'react', name: 'React' },
  { id: 'ts', name: 'TypeScript' },
  { id: 'uxui', name: 'UX / UI' },
  { id: 'figma', name: 'Figma' },
]

export const SOCIAL_LINKS = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/' },
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/' },
] as const
