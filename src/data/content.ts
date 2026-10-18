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
  { href: '#beneficios', label: 'Por quê' },
  { href: '#processo', label: 'Processo' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#planos', label: 'Planos' },
  { href: '#faq', label: 'FAQ' },
] as const

export const PIXEL_ARTS = [
  { id: 'codando', src: assetUrl('/pixel/arts/filipe_pinheiro_01_codando.webp'), alt: 'Pixel art: Filipe codando' },
  { id: 'treinando', src: assetUrl('/pixel/arts/filipe_pinheiro_02_treinando.webp'), alt: 'Pixel art: Filipe treinando' },
  { id: 'negociando', src: assetUrl('/pixel/arts/filipe_pinheiro_03_negociando.webp'), alt: 'Pixel art: Filipe negociando' },
  { id: 'correndo', src: assetUrl('/pixel/arts/filipe_pinheiro_04_correndo.webp'), alt: 'Pixel art: Filipe correndo' },
  { id: 'pensando', src: assetUrl('/pixel/arts/filipe_pinheiro_05_pensando.webp'), alt: 'Pixel art: Filipe pensando' },
  { id: 'apontando', src: assetUrl('/pixel/arts/filipe_pinheiro_06_apontando.webp'), alt: 'Pixel art: Filipe apontando' },
  { id: 'setup', src: assetUrl('/pixel/arts/filipe_pinheiro_07_setup_codigo.webp'), alt: 'Pixel art: setup de código' },
  { id: 'viagem', src: assetUrl('/pixel/arts/filipe_pinheiro_08_viagem.webp'), alt: 'Pixel art: Filipe viajando' },
  { id: 'planejando', src: assetUrl('/pixel/arts/filipe_pinheiro_09_planejando.webp'), alt: 'Pixel art: Filipe planejando' },
  { id: 'comemorando', src: assetUrl('/pixel/arts/filipe_pinheiro_10_comemorando.webp'), alt: 'Pixel art: Filipe comemorando' },
  { id: 'lifestyle', src: assetUrl('/pixel/arts/filipe_pinheiro_11_lifestyle.webp'), alt: 'Pixel art: Filipe lifestyle' },
  { id: 'headphone', src: assetUrl('/pixel/arts/filipe_pinheiro_12_headphone.webp'), alt: 'Pixel art: Filipe com headphone' },
] as const

export const SERVICES: Service[] = [
  {
    id: 'institucionais',
    title: 'Sites Institucionais',
    description:
      'Seu canto na internet com a sua cara. Estrutura clara, identidade forte e pronto pro Google desde o dia zero.',
    icon: 'code',
    bullets: [
      'Design que parece você (não template)',
      'Responsivo do mobile ao ultrawide',
      'Formulários e integrações no ponto',
    ],
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages que Convertem',
    description:
      'Uma página, um objetivo: transformar visita em cliente. Copy na medida, CTA no lugar certo e zero enrolação.',
    icon: 'target',
    bullets: [
      'Estrutura pensada em conversão',
      'CRM e anúncios plugados',
      'Velocidade que não espanta lead',
    ],
  },
  {
    id: 'one-page',
    title: 'One Page & Portfólio',
    description:
      'Presença enxuta e afiada numa página só. Ideal pra quem precisa existir online sem drama.',
    icon: 'browser',
    bullets: [
      'Direto ao ponto',
      'Entrega rápida',
      'Perfeito pra bio link e portfólio',
    ],
  },
  {
    id: 'redesign',
    title: 'Redesign & Otimização',
    description:
      'Site velho ou que não converte? A gente ressuscita com UX, velocidade e visual que bate.',
    icon: 'growth',
    bullets: ['Auditoria de UX e performance', 'Visual modernizado', 'Migração sem downtime'],
  },
  {
    id: 'seo',
    title: 'SEO Técnico',
    description:
      'Pra seu site ser encontrado, não só existir. Semântica, Core Web Vitals e o básico bem feito.',
    icon: 'chart',
    bullets: ['Auditoria técnica completa', 'Schema.org e meta tags', 'Relatórios de indexação'],
  },
  {
    id: 'manutencao',
    title: 'Manutenção & Suporte',
    description:
      'Não entreguei e sumi. Seu site no ar, atualizado e com suporte quando precisar.',
    icon: 'battery',
    bullets: ['Atualizações e correções', 'Monitoramento e backups', 'Ajustes sob demanda'],
  },
]

export const BENEFITS: Benefit[] = [
  {
    id: 'performance',
    title: 'Performance real',
    description:
      'Carrega em segundos. Core Web Vitals no verde pra não perder cliente (nem ranqueio).',
    icon: 'growth',
  },
  {
    id: 'responsivo',
    title: '100% responsivo',
    description:
      'Do celular ao desktop sem quebrar. A maioria do seu público tá no mobile — e eu não esqueço disso.',
    icon: 'cursor',
  },
  {
    id: 'seo',
    title: 'SEO desde o início',
    description:
      'Estrutura e metadados pensados pra Google entender (e premiar) o que você faz.',
    icon: 'wifi',
  },
  {
    id: 'design',
    title: 'Design exclusivo',
    description:
      'Nada de template genérico. Identidade visual única que faz sua marca ser lembrada.',
    icon: 'idea',
  },
  {
    id: 'prazos',
    title: 'Prazos cumpridos',
    description:
      'Cronograma transparente e comunicação constante. Você sabe exatamente onde a gente tá.',
    icon: 'trophy',
  },
  {
    id: 'suporte',
    title: 'Suporte contínuo',
    description:
      'Entreguei e continuo junto. Lançamento, ajustes e evolução do projeto.',
    icon: 'coffee',
  },
]

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'briefing',
    step: '01',
    title: 'Briefing',
    description:
      'A gente conversa: objetivo, público, prazo, o que te tira do sono. Antes de qualquer pixel, eu entendo o seu negócio.',
  },
  {
    id: 'design',
    step: '02',
    title: 'Design',
    description:
      'Wireframe e layout com a sua identidade. Você aprova cada etapa antes de a gente avançar.',
  },
  {
    id: 'dev',
    step: '03',
    title: 'Dev',
    description:
      'Código limpo, rápido e responsivo. Integrações, formulários, SEO técnico e testes de verdade.',
  },
  {
    id: 'entrega',
    step: '04',
    title: 'Entrega & Suporte',
    description:
      'Publicação, treinamento e acompanhamento pós-lançamento. O jogo continua depois do deploy.',
  },
]

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 'filipestudio',
    category: 'Este site',
    title: 'FilipeStudio',
    description:
      'Site institucional feito por mim, do design ao deploy. React + TypeScript, Lighthouse 95+, blog automatizado por GitHub Issues e CI/CD com GitHub Actions.',
    emoji: '⚡',
    gradient: 'from-roxo via-azul to-ciano',
    href: 'https://filipeprodrigues.github.io/filipestudio-site/',
    image: assetUrl('/portfolio-filipestudio.webp'),
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ana',
    quote:
      'Ficou acima do que eu imaginava. Profissional do início ao fim e o prazo foi cumprido à risca. Já indiquei pra três colegas!',
    name: 'Ana Souza',
    role: 'CEO, Startup Tech',
    initials: 'AS',
    avatarGradient: 'from-roxo to-ciano',
    rating: 5,
  },
  {
    id: 'carlos',
    quote:
      'Nossa landing triplicou a captação de leads em dois meses. Entende de negócio, não só de código. Recomendo demais.',
    name: 'Carlos Mendes',
    role: 'Diretor de Marketing',
    initials: 'CM',
    avatarGradient: 'from-roxo to-azul',
    rating: 5,
  },
  {
    id: 'juliana',
    quote:
      'Processo transparente, comunicação clara e um resultado lindo. Minha landing ficou rápida e os leads subiram desde o lançamento.',
    name: 'Juliana Rocha',
    role: 'Fundadora, Marca de Lifestyle',
    initials: 'JR',
    avatarGradient: 'from-ciano to-azul',
    rating: 5,
  },
]

export const PRICING: PricingTier[] = [
  {
    id: 'essencial',
    name: 'Essencial',
    description: 'Pra quem tá começando a presença digital.',
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
    ctaLabel: 'Bora conversar',
  },
  {
    id: 'profissional',
    name: 'Profissional',
    description: 'Pra quem quer leads consistentes e presença que cresce.',
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
    ctaLabel: 'Quero esse',
  },
]

export const FAQS: FaqItem[] = [
  {
    id: 'tempo',
    question: 'Quanto tempo leva pra fazer um site?',
    answer:
      'Depende do tamanho. Landing page sai em 7 a 10 dias úteis. Site institucional leva de 2 a 4 semanas. Projeto customizado, de 4 a 8 semanas. Depois do briefing você recebe um cronograma fechado.',
  },
  {
    id: 'pagamento',
    question: 'Como funciona o pagamento?',
    answer:
      'Em etapas, sem susto: normalmente 40% na aprovação, 30% na entrega do design e 30% na publicação. Aceito Pix, transferência e cartão. Projeto maior? A gente combina um plano que cabe no seu bolso.',
  },
  {
    id: 'responsivo',
    question: 'O site vai ficar bom no celular?',
    answer:
      'Com certeza. Todo projeto é mobile-first e testado em vários aparelhos. Experiência no celular é prioridade — é de lá que vem a maior parte do tráfego.',
  },
  {
    id: 'conteudo',
    question: 'Vocês fazem os textos?',
    answer:
      'Ajudando com copy orientada a conversão, sim. Se preferir, também trampo com redator especializado. O ideal é você trazer o material da marca (textos, fotos, logo) e eu traduzo isso em uma experiência que vende.',
  },
  {
    id: 'suporte',
    question: 'Tem suporte depois da entrega?',
    answer:
      'Tem. Todos os planos incluem suporte pós-lançamento (de 30 a 90 dias, conforme o plano) pra correções e ajustes. E tem plano mensal de manutenção se você quiser ficar tranquilo.',
  },
  {
    id: 'atendimento',
    question: 'Atendem fora de BH?',
    answer:
      'Sim! Trampo 100% remoto com clientes de qualquer lugar do Brasil (e do exterior). Comunicação por WhatsApp, e-mail e videochamada — clara e organizada.',
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
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/filipe-pinheiro-rodrigues-a7281134a/' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/lipe___dev/' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/FilipePRodrigues' },
] as const
