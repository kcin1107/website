export type ProjectCategory = 'business' | 'web' | 'side'

export interface Category {
  id: ProjectCategory
  title: string
  description: string
}

export interface ProjectImage {
  src: string
  alt: string
}

export const categories: Category[] = [
  {
    id: 'business',
    title: 'Business Applications',
    description: 'These projects were done in larger companies with complex business requirements & collaboration between multiple departments.',
  },
  {
    id: 'web',
    title: 'Web Projects',
    description: 'These are straight-forward web development projects that were done solely by me as designer & a frontend developer if needed.',
  },
  {
    id: 'side',
    title: 'Side Projects',
    description: 'My side projects mostly consist of things I am passioned about or where a need or problem existed that I wanted to solve by (and sometimes for) myself.',
  },
]

export interface Project {
  slug?: string
  image?: string
  images?: ProjectImage[]
  alt: string
  title: string
  client: string
  topicTag: string
  tags: string[]
  description?: string
  category: ProjectCategory
  showOnHome?: boolean
}

export const projects: Project[] = [
  // Business Applications
  {
    slug: 'encavis-business-application',
    image: '/assets/images/card2.png',
    alt: 'Encavis AG Asset Data Management Tool',
    title: 'Asset Data Management Tool',
    client: 'Encavis AG (Asset Ocean)',
    topicTag: 'Renewables',
    tags: ['B2B', 'UX Design', 'UI Design', 'Design System', 'UX Research', 'SCRUM'],
    category: 'business',
  },
  {
    slug: 'boomerang-behavioral-design',
    image: '/assets/images/card6.png',
    alt: 'Boomerang Systems Behavioral Design',
    title: 'Nudging in E-Commerce Checkouts',
    client: 'Boomerang Systems',
    topicTag: 'E-Commerce',
    tags: ['B2C', 'Behavioral Design', 'Nudging', 'UX Research', 'Heuristic Evaluation'],
    category: 'business',
  },

  // Web Projects
  {
    slug: 'boomerang-landing-page',
    image: '/assets/images/project-card-boomerang-20260605.png',
    images: [
      {
        src: '/assets/images/projects/boomerang-live-20260605.png',
        alt: 'Boomerang live website screenshot',
      },
    ],
    alt: 'Boomerang Systems Landing Page',
    title: 'Landing Page for a Logistics Start-Up',
    client: 'Boomerang Systems',
    topicTag: 'Web Design',
    tags: ['Webflow', 'B2B', 'B2C', 'Frontend'],
    description: 'A Webflow landing page for Boomerang Systems, presenting reusable shipping boxes and bags for online shops, B2B logistics, and circular shipping processes.',
    category: 'web',
  },
  {
    slug: 'loeffelholz-care',
    image: '/assets/images/project-card-loeffelholz-care-20260605.png',
    images: [
      {
        src: '/assets/images/projects/loeffelholz-care-live-20260605.png',
        alt: 'Löffelholz Care Mobil live website screenshot',
      },
    ],
    alt: 'Löffelholz Care Mobil Landing Page',
    title: 'Landing Page for a Nursing Business',
    client: 'Löffelholz Care',
    topicTag: 'Web Design',
    tags: ['Webflow', 'Mobile-First', 'Frontend'],
    description: 'A mobile-first Webflow website for Löffelholz Care, an ambulatory care provider in Hamburg offering nursing care, housekeeping, personal assistance, and care consulting.',
    category: 'web',
  },
  {
    slug: '1300etc',
    image: '/assets/images/project-card-1300etc-20260605.png',
    images: [
      {
        src: '/assets/images/projects/1300etc-live-20260605.png',
        alt: '1300ETC live website screenshot',
      },
    ],
    alt: '1300ETC Landing Page',
    title: 'Landing Page for a Racing Series',
    client: '1300ETC',
    topicTag: 'Web Design',
    tags: ['Mobile-First', 'WordPress', 'Frontend'],
    description: 'A WordPress landing page for 1300ETC, a historic motorsport racing series for touring cars up to 1300cc inspired by the former European Touring Car Championship.',
    category: 'web',
  },

  // Side Projects
  {
    slug: 'scorer',
    image: '/assets/images/card5.jpg',
    alt: 'Scorer – iOS Darts App',
    title: 'Scorer',
    client: 'Get The Score Done',
    topicTag: 'Darts',
    tags: ['B2C', 'UI Design', 'iOS', 'Swift', 'MCP'],
    category: 'side',
  },
  {
    slug: 'my-website',
    image: '/assets/images/project-card-nickringelmann-20260605.png',
    images: [
      {
        src: '/assets/images/projects/nickringelmann-live-20260605.png',
        alt: 'nickringelmann.com live website screenshot',
      },
    ],
    alt: 'My Website',
    title: 'My Website',
    client: 'nickringelmann.com',
    topicTag: 'Portfolio',
    tags: ['Astro', 'Frontend', 'UX Design'],
    description: 'A personal portfolio built with Astro 6 as a fully static site — no UI framework, just TypeScript for data, a single global stylesheet, and a few lines of vanilla JS for the theme toggle and mobile nav. Designed and developed entirely by me, self-hosted on IONOS.',
    category: 'side',
    showOnHome: false,
  },
  {
    alt: 'Cleankey – macOS keyboard cleaner',
    title: 'Cleankey',
    client: 'Clean Your Keyboard',
    topicTag: 'macOS',
    tags: ['B2C', 'UI Design', 'macOS', 'Swift', 'MCP'],
    category: 'side',
  },
  {
    alt: 'Fuel Station App',
    title: 'Fuel Station App',
    client: 'Coming soon',
    topicTag: '-',
    tags: ['-'],
    category: 'side',
  },
  {
    alt: 'Hylla',
    title: 'Hylla',
    client: 'Coming soon',
    topicTag: '-',
    tags: ['-'],
    category: 'side',
  },
]
