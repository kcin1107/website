export type ProjectCategory = 'business' | 'web' | 'side'

export interface Category {
  id: ProjectCategory
  title: string
  description: string
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
  alt: string
  title: string
  client: string
  topicTag: string
  tags: string[]
  description?: string
  category: ProjectCategory
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
    image: '/assets/images/card1.png',
    alt: 'Boomerang Systems Landing Page',
    title: 'Landing Page for a Logistics Start-Up',
    client: 'Boomerang Systems',
    topicTag: 'Web Design',
    tags: ['Webflow', 'B2B', 'B2C', 'Frontend'],
    category: 'web',
  },
  {
    slug: 'loeffelholz-care',
    image: '/assets/images/card3.png',
    alt: 'Löffelholz Care Landing Page',
    title: 'Landing Page for a Nursing Business',
    client: 'Löffelholz Care',
    topicTag: 'Web Design',
    tags: ['Webflow', 'Mobile-First', 'Frontend'],
    category: 'web',
  },
  {
    slug: '1300etc',
    image: '/assets/images/card4.png',
    alt: '1300ETC Landing Page',
    title: 'Landing Page for a Racing Series',
    client: '1300ETC',
    topicTag: 'Web Design',
    tags: ['Mobile-First', 'WordPress', 'Frontend'],
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
    alt: 'My Website',
    title: 'My Website',
    client: 'Coming soon',
    topicTag: 'Web Design',
    tags: ['B2B', 'Frontend', 'Astro', 'MCP'],
    category: 'side',
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
