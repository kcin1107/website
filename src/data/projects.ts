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
  mobileImage?: ProjectImage
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
    image: '/assets/images/project-card-boomerang-20260720.png',
    mobileImage: {
      src: '/assets/images/projects/boomerang-mobile-20260721.jpg',
      alt: 'Boomerang homepage on mobile, scrolled through the hero, box highlights, and partner logos',
    },
    images: [
      {
        src: '/assets/images/projects/boomerang-live-20260720.png',
        alt: 'Boomerang homepage hero showing a courier holding a reusable shipping bag',
      },
      {
        src: '/assets/images/projects/boomerang-boxen-20260721.png',
        alt: 'Boomerang product grid showing the Briefkasten, Automatikboden, and Pick & Ship reusable box models',
      },
      {
        src: '/assets/images/projects/boomerang-testimonial-20260721.png',
        alt: 'Boomerang testimonial from WMF Group citing an 84 percent CO2 reduction from switching to reusable boxes',
      },
    ],
    alt: 'Boomerang Systems Website',
    title: 'Website Relaunch for a Logistics Start-Up',
    client: 'Boomerang Systems',
    topicTag: 'Web Design',
    tags: ['Astro', 'Webflow Migration', 'B2B', 'B2C', 'Frontend', 'Technical SEO'],
    description: 'Boomerang Systems needed to leave Webflow, but their customers already knew the look of boomerangpack.eu, so a full redesign was off the table. I rebuilt the site as a static Astro build and handled the design and the frontend myself. The old pages were a pile of copy-pasted markup, so I turned the repeating pieces into proper components. I also kept a handful of old Webflow class names in place instead of renaming everything: renaming every selector risked breaking something for no real benefit to the customer, so I left them alone and spent the time on parts of the rebuild that mattered more.\n\nThe content team was used to dropping in images the Webflow way, a plain path like /images/foo.jpg, so I built a small layer that keeps that habit working while Astro serves properly sized, optimized versions behind the scenes. I also added structured data across the site so Google can read what Boomerang sells: the company info, the products, the services, the FAQ answers, instead of guessing from the page text. The sitemap now builds itself and gives product pages and news pages the right priority, while pages marked "don\'t index" stay out of it automatically. For deployment, publishing a GitHub release triggers the real build and push to the live server. Marking something a pre-release instead runs the identical pipeline as a dry run first, so I can catch problems before anything reaches customers.',
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
    image: '/assets/images/project-card-1300etc-20260721.png',
    mobileImage: {
      src: '/assets/images/projects/1300etc-mobile-20260721.jpg',
      alt: '1300ETC homepage on mobile, scrolled through the hero, vehicle info slider, stats banner and next-events cards',
    },
    images: [
      {
        src: '/assets/images/projects/1300etc-hero-20260721.png',
        alt: '1300ETC homepage hero showing a grid of historic touring cars racing at Circuit de Spa-Francorchamps in the rain',
      },
      {
        src: '/assets/images/projects/1300etc-termine-20260721.png',
        alt: 'Race calendar detail cards for the 2026 season showing real dates, tracks and country flags for Spa, Hockenheim and Zolder',
      },
      {
        src: '/assets/images/projects/1300etc-strecken-20260721.png',
        alt: 'Interactive Leaflet map pinning every 2026 season race track across Germany, Belgium, the Netherlands and France',
      },
    ],
    alt: '1300ETC website relaunch',
    title: 'Website Relaunch for a Historic Racing Series',
    client: '1300ETC',
    topicTag: 'Web Design',
    tags: ['Astro', 'WordPress Migration', 'Multilingual', 'Frontend', 'CMS', 'Technical SEO'],
    description: 'The existing 1300ETC site ran on WordPress and Oxygen Builder, with TranslatePress handling German, English, French and Dutch. For the relaunch, I kept the established motorsport identity while rebuilding the experience around the tasks drivers and fans return for: the race calendar, results, history, registration documents, FAQs and contact details. I created shared Astro page components to keep those routes consistent across all four languages, with the same information structure on desktop and mobile.\n\nI replaced WordPress with a fully static Astro build styled with Tailwind CSS, and moved the race dates, tracks, results, sponsors, history and page copy into typed Content Collections. Each track\'s address and coordinates now feed an interactive Leaflet map on the schedule page, so fans can see where the season actually takes them instead of scanning a list of city names. The included Sveltia CMS gives a browser-based way to maintain that structured content without editing source files. Astro turns local imagery into modern formats, while canonical URLs and hreflang alternates identify the correct language version of each page for search engines. Every push to the main branch runs Astro and TypeScript checks, builds the site, then deploys the static output to the existing hosting over FTP.',
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
