import type { ImageMetadata } from 'astro'

import card2 from '../assets/images/card2.png'
import card5 from '../assets/images/card5.jpg'

import boomerangCard from '../assets/images/project-card-boomerang-20260720.png'
import boomerangMobile from '../assets/images/projects/boomerang-mobile-20260721.jpg'
import boomerangLive from '../assets/images/projects/boomerang-live-20260720.png'
import boomerangBoxen from '../assets/images/projects/boomerang-boxen-20260721.png'
import boomerangTestimonial from '../assets/images/projects/boomerang-testimonial-20260721.png'

import boomerangNudgingCard from '../assets/images/project-card-boomerang-nudging-20260728.png'
import boomerangNudgingCartControl from '../assets/images/projects/boomerang-nudging-cart-control-20260728.png'
import boomerangNudgingShippingControl from '../assets/images/projects/boomerang-nudging-shipping-control-20260728.png'
import boomerangNudgingShippingRedesign from '../assets/images/projects/boomerang-nudging-shipping-redesign-20260728.png'

import loeffelholzCareCard from '../assets/images/project-card-loeffelholz-care-20260605.png'
import loeffelholzCareMobile from '../assets/images/projects/loeffelholz-care-mobile-20260721.jpg'
import loeffelholzCareHero from '../assets/images/projects/loeffelholz-care-hero-20260721.png'
import loeffelholzCareHauswirtschaft from '../assets/images/projects/loeffelholz-care-hauswirtschaft-20260721.png'
import loeffelholzCareKontakt from '../assets/images/projects/loeffelholz-care-kontakt-20260721.png'

import loeffelholzCareMobilCard from '../assets/images/project-card-loeffelholz-care-mobil-20260722.png'
import loeffelholzCareMobilMobile from '../assets/images/projects/loeffelholz-care-mobil-mobile-20260722.jpg'
import loeffelholzCareMobilJobsHero from '../assets/images/projects/loeffelholz-care-mobil-jobs-hero-20260722.png'
import loeffelholzCareMobilKontakt from '../assets/images/projects/loeffelholz-care-mobil-kontakt-20260722.png'
import loeffelholzCareMobilLeistungen from '../assets/images/projects/loeffelholz-care-mobil-leistungen-20260722.png'

import etcCard from '../assets/images/project-card-1300etc-20260721.png'
import etcMobile from '../assets/images/projects/1300etc-mobile-20260721.jpg'
import etcHero from '../assets/images/projects/1300etc-hero-20260721.png'
import etcTermine from '../assets/images/projects/1300etc-termine-20260721.png'
import etcStrecken from '../assets/images/projects/1300etc-strecken-20260721.png'

import nickringelmannCard from '../assets/images/project-card-nickringelmann-20260605.png'
import nickringelmannMobile from '../assets/images/projects/nickringelmann-mobile-20260724.jpg'
import nickringelmannHero from '../assets/images/projects/nickringelmann-hero-20260724.png'
import nickringelmannProjects from '../assets/images/projects/nickringelmann-projects-20260724.png'
import nickringelmannApproach from '../assets/images/projects/nickringelmann-approach-20260724.png'

export type ProjectCategory = 'business' | 'web' | 'side'

export interface Category {
  id: ProjectCategory
  title: string
  description: string
}

export interface ProjectImage {
  src: ImageMetadata
  alt: string
}

export interface ProjectMeta { label: string; value: string }

export type ProjectSection =
  | { kind: 'prose';   title?: string; body?: string; list?: string[] }
  | { kind: 'steps';   layout: 'numbered' | 'chain'; title?: string; body?: string;
      steps: { label: string; text?: string; highlight?: boolean }[] }
  | { kind: 'figure';  title?: string; body?: string; image: ProjectImage; caption?: string }
  | { kind: 'compare'; title?: string; body?: string; caption?: string;
      before: { image: ProjectImage; label: string }
      after:  { image: ProjectImage; label: string } }
  | { kind: 'metrics'; title?: string; body?: string;
      metrics: { value: string; label: string; note?: string }[] }
  | { kind: 'embed';   name: 'result-matrix' | 'framing-nudge' | 'shipping-nudge';
      title?: string; body?: string; caption?: string }

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
  image?: ImageMetadata
  images?: ProjectImage[]
  mobileImage?: ProjectImage
  alt: string
  title: string
  client: string
  topicTag?: string
  tags: string[]
  description?: string
  category: ProjectCategory
  showOnHome?: boolean
  lead?: string
  meta?: ProjectMeta[]
  sections?: ProjectSection[]
}

export const projects: Project[] = [
  // Business Applications
  {
    slug: 'encavis-business-application',
    image: card2,
    alt: 'Encavis AG Asset Data Management Tool',
    title: 'Asset Data Management Tool',
    client: 'Encavis AG (Asset Ocean)',
    topicTag: 'Renewables',
    tags: ['B2B', 'UX Design', 'UI Design', 'Design System', 'UX Research', 'SCRUM'],
    category: 'business',
    meta: [
      { label: 'Role', value: '' },
      { label: 'Timeframe', value: '' },
      { label: 'Year', value: '' },
      { label: 'Tools', value: '' },
    ],
  },
  {
    slug: 'boomerang-behavioral-design',
    image: boomerangNudgingCard,
    alt: 'Redesigned Shopify cart with the reusable packaging deposit as a line item and a green framing nudge promising up to 80% less CO2 than disposable packaging',
    title: 'Nudging in E-Commerce Checkouts',
    client: 'Boomerang Systems',
    topicTag: 'E-Commerce',
    tags: ['B2C', 'Behavioral Design', 'Nudging', 'UX Research', 'Heuristic Evaluation'],
    category: 'business',
    lead: 'Reusable shipping packaging exists in German e-commerce. Almost nobody selects it. I rebuilt the checkout around two behavioral nudges and tested it against the current integration.',
    meta: [
      { label: 'Role', value: 'Research, UX and UI design, test design' },
      { label: 'Timeframe', value: '12 weeks' },
      { label: 'Year', value: '2023' },
      { label: 'Tools', value: 'Figma, Maze, jamovi, G*Power' },
    ],
    sections: [
      {
        kind: 'embed',
        name: 'result-matrix',
        body: '54 participants, split evenly and at random across two prototypes. Six of the 27 people who saw the current integration ordered with reusable packaging. Fifteen of the 27 who saw the redesign did.',
      },
      {
        kind: 'prose',
        title: 'The problem',
        body: 'Germany passed 4.5 billion parcels in 2021. Paper and cardboard shipping packaging came to 863,200 tonnes in 2018, and the INFA institute measured it at 64 to 71 percent of the volume in household paper bins. Reusable packaging cuts that waste. Customers have to actively choose it, and hardly anyone does.',
      },
      {
        kind: 'steps',
        layout: 'numbered',
        title: 'How I worked',
        steps: [
          { label: 'Status quo', text: 'Audit the reusable integrations already running in real shops.' },
          { label: 'Frameworks', text: 'Work out which sustainable design levers apply to a checkout.' },
          { label: 'Design', text: 'Rebuild the checkout around the levers that survived.' },
          { label: 'Evaluation', text: 'Test the redesign against a faithful rebuild of the status quo.' },
        ],
      },
      {
        kind: 'prose',
        title: 'What the audit found',
        body: 'Boomerang was my thesis partner, and their widget for adding reusable packaging to a Shopify cart had already shipped. That widget was the starting point, so the first thing I did was audit it.\n\nI looked at four Shopify shops running two reusable systems, RePack at Hopaal and Skhoop, Boomerang at Dirts and Kaala Yoga, and scored each against Nielsen\'s heuristics plus e-commerce criteria from Bonastre and Granollers and the Baymard Institute. The same four problems showed up in all of them, my partner\'s included.',
        list: [
          'The reusable option sits in the cart as a normal line item, so people can order three of them by accident',
          'Once past the cart, nobody can edit or remove it',
          'It never appears in the shipping step, where the delivery decision actually happens',
          'No number anywhere tells the customer what choosing it changes',
        ],
      },
      {
        kind: 'figure',
        image: {
          src: boomerangNudgingCartControl,
          alt: 'Boomerang\'s shipped cart widget on a demo Shopify store, showing a rucksack at a subtotal of 99,99 euros and an orange banner reading "Use reusable shipping for a 3 euro deposit and do something good for the climate," with a Select reusable shipping button and no reusable item added yet',
        },
        caption: 'This is Boomerang\'s widget as it already shipped, the state I used as the control condition in the test.',
      },
      {
        kind: 'prose',
        title: 'Narrowing twelve frameworks to two',
        body: 'A keyword search turned up twelve sustainable design frameworks. I scored each on three questions: can you design digital products and services with it, does it give concrete recommendations or only holistic ones, and does it cover e-commerce specifically. Only The Sustainable Ecommerce Handbook answered all three. Plenty scored two out of three, so the second pick was a judgment call: Design for Sustainable Behavior, because it adds applicable behavior-change strategies on top of the holistic view.\n\nMost of this literature is written for physical products, material sourcing and manufacturing. Visual design barely gets covered, so there were no best practices to borrow. What did transfer were four levers: transparency, education, association with sustainability, and incentive. The place they applied was the UX writing.',
      },
      {
        kind: 'prose',
        title: 'Picking the behavioral goal',
        body: 'Four papers on green nudging agreed on five nudge types once I set the bar at three of four sources: framing, priming, social reference, default, and prompting. Beermann et al. reviewed 64 green nudges and sorted them by which of three behavioral goals they served: changing an existing behavior, reinforcing one that already exists, or forming a new one. Different goals call for different nudges, so picking the goal decides the design.\n\nThe goal was not obvious. Almost nobody selects reusable shipping, and that reads either as changing an existing behavior, single-use, or as forming a new one. I settled on reinforcing an existing behavior, because I was testing against a live integration that already had customers and a conversion rate, however small. That choice put framing and social reference on the table.\n\nI dropped the default nudge. Preselecting reusable changes the commercial relationship between the shop and the packaging company, not the interface, so it was not mine to propose.',
      },
      {
        kind: 'embed',
        name: 'framing-nudge',
        title: 'The cart nudge answers "why would I"',
        body: 'Framing translates the benefit into a number, then explains the deposit mechanic in three lines. Green type, the licensed Mehrweg mark, one prominent button. This one is pure persuasion. It does not change how the cart works.',
      },
      {
        kind: 'embed',
        name: 'shipping-nudge',
        title: 'The shipping nudge answers "how should this work"',
        body: 'Reusable becomes a radio button next to standard shipping, priced the same. One selection instead of a line item with a quantity stepper, placed at the step where people actually decide how a parcel arrives, with a count of how many chose it yesterday and a tooltip that covers the deposit.',
      },
      {
        kind: 'compare',
        title: 'The shipping step, before and after',
        body: 'The current integration offers one option and never mentions reusable packaging, at the exact point where somebody decides how their parcel arrives. That absence was the fourth audit finding, and it is the one you can see.',
        before: {
          image: {
            src: boomerangNudgingShippingControl,
            alt: 'Shipping step in the current integration, showing only a Standard option at 3,90 euros for 2 to 4 workdays. Nothing on the screen mentions reusable packaging.',
          },
          label: 'Current integration',
        },
        after: {
          image: {
            src: boomerangNudgingShippingRedesign,
            alt: 'Redesigned shipping step with two options priced the same at 3,90 euros: Standard, selected, and Reusable shipping with a 3 euro deposit, next to a green line noting that 41 customers chose reusable shipping the day before',
          },
          label: 'Redesign',
        },
        caption: 'Reusable shipping priced identically to standard, as a real choice rather than an add-on bought earlier.',
      },
      {
        kind: 'steps',
        layout: 'chain',
        title: 'The prototype',
        body: 'I built the full flow as an eight-screen clickable prototype in Figma on Shopify\'s Dawn theme and checkout UI kit, plus a faithful rebuild of the current integration as the control.',
        steps: [
          { label: 'Product list' },
          { label: 'Product' },
          { label: 'Cart', highlight: true },
          { label: 'Information' },
          { label: 'Shipping options', highlight: true },
          { label: 'Payment' },
          { label: 'Processing' },
          { label: 'Confirmation' },
        ],
      },
      {
        kind: 'metrics',
        title: 'The test',
        body: 'Between-subjects, 54 participants, split evenly and randomly across both prototypes in Maze. Sample size came from an a priori power calculation in G*Power.',
        metrics: [
          { value: '6.31', label: 'Pearson chi-square' },
          { value: '0.012', label: 'p value' },
          { value: '0.342', label: 'Cramér\'s V', note: 'moderate effect' },
          { value: '11 of 15', label: 'converted at the cart nudge', note: 'the other 4 at the shipping step' },
        ],
      },
      {
        kind: 'prose',
        title: 'What it doesn\'t prove',
        body: 'No real money changed hands, so hypothetical bias applies and the absolute numbers will not hold in a live shop. The task itself pushed in the same direction: a Maze mission tells you to complete a purchase, so choosing reusable cost participants nothing they cared about. Achieved power was 0.71 against a target of 0.8. Desktop only.\n\nThe honest next step is an A/B test in a shop that already sells reusable shipping.',
      },
    ],
  },

  // Web Projects
  {
    slug: 'boomerang-landing-page',
    image: boomerangCard,
    mobileImage: {
      src: boomerangMobile,
      alt: 'Boomerang homepage on mobile, scrolled through the hero, box highlights, and partner logos',
    },
    images: [
      {
        src: boomerangLive,
        alt: 'Boomerang homepage hero showing a courier holding a reusable shipping bag',
      },
      {
        src: boomerangBoxen,
        alt: 'Boomerang product grid showing the letterbox-slot, auto-bottom, and Pick & Ship reusable box models',
      },
      {
        src: boomerangTestimonial,
        alt: 'Boomerang testimonial from WMF Group citing an 84 percent CO2 reduction from switching to reusable boxes',
      },
    ],
    alt: 'Boomerang Systems Website',
    title: 'Website Relaunch for a Logistics Start-Up',
    client: 'Boomerang Systems',
    topicTag: 'Web Design',
    tags: ['Astro', 'Webflow Migration', 'B2B', 'B2C', 'Frontend', 'Technical SEO'],
    category: 'web',
    meta: [
      { label: 'Role', value: '' },
      { label: 'Timeframe', value: '' },
      { label: 'Year', value: '' },
      { label: 'Tools', value: '' },
    ],
    description: 'Boomerang Systems needed to leave Webflow, but their customers already knew the look of boomerangpack.eu, so a full redesign was off the table. I rebuilt the site as a static Astro build and handled the design and the frontend myself. The old pages were a pile of copy-pasted markup, so I turned the repeating pieces into proper components. I also kept a handful of old Webflow class names in place instead of renaming everything: renaming every selector risked breaking something for no real benefit to the customer, so I left them alone and spent the time on parts of the rebuild that mattered more.\n\nThe content team was used to dropping in images the Webflow way, a plain path like /images/foo.jpg, so I built a small layer that keeps that habit working while Astro serves properly sized, optimized versions behind the scenes. I also added structured data across the site so Google can read what Boomerang sells: the company info, the products, the services, the FAQ answers, instead of guessing from the page text. The sitemap now builds itself and gives product pages and news pages the right priority, while pages marked "don\'t index" stay out of it automatically. For deployment, publishing a GitHub release triggers the real build and push to the live server. Marking something a pre-release instead runs the identical pipeline as a dry run first, so I can catch problems before anything reaches customers.',
  },
  {
    slug: 'loeffelholz-care',
    image: loeffelholzCareCard,
    mobileImage: {
      src: loeffelholzCareMobile,
      alt: 'Löffelholz Care homepage on mobile, scrolled through the Hamburg Speicherstadt hero, the founder photo, and the "all-inclusive care package" section',
    },
    images: [
      {
        src: loeffelholzCareHero,
        alt: 'Löffelholz Care homepage hero showing Hamburg\'s Speicherstadt at dusk with the headline "Your Ambulatory Care Service"',
      },
      {
        src: loeffelholzCareHauswirtschaft,
        alt: 'Illustrated household help service card listing grocery shopping, cleaning, laundry, and meal preparation',
      },
      {
        src: loeffelholzCareKontakt,
        alt: 'Contact form on the Contact page with fields for name, email, phone, and message',
      },
    ],
    alt: 'Löffelholz Care Website',
    title: 'Website for a Home Care Provider',
    client: 'Löffelholz Care',
    topicTag: 'Web Design',
    tags: ['Webflow', 'Mobile-First', 'Frontend'],
    description: 'Löffelholz Care is an ambulatory care service in Hamburg, run by founder Martin Löffelholz with about 60 staff. The site focuses on showing their services clearly, mobile-first with large text for easy readability, since many clients are older. Since 2023 the company has partnered with Schwulenberatung Berlin\'s Lebensort Vielfalt project and joined the Welcoming Out network. The homepage shows the Progress Pride flag next to both partner badges.\n\nThe site runs on Webflow, with the phone number in a fixed bar above the navigation on every page. Cookiebot handles cookie consent. Webflow\'s CMS lets the Löffelholz Care team update pages themselves without a developer.',
    category: 'web',
    meta: [
      { label: 'Role', value: 'Concept, Design & Implementation' },
      { label: 'Timeframe', value: '2 weeks' },
      { label: 'Year', value: '2025' },
      { label: 'Tools', value: 'Figma, Webflow, GTM, Claude Code, Codex, MCP' },
    ],
  },
  {
    slug: 'loeffelholz-care-mobil',
    image: loeffelholzCareMobilCard,
    mobileImage: {
      src: loeffelholzCareMobilMobile,
      alt: 'Löffelholz Care Mobil homepage on mobile, scrolled through the hero, service cards, and footer with partner link to Löffelholz Care',
    },
    images: [
      {
        src: loeffelholzCareMobilJobsHero,
        alt: 'Löffelholz Care Mobil jobs page hero with the headline "A Job with Heart and Fair Conditions!" next to a driver portrait at Hamburg harbour',
      },
      {
        src: loeffelholzCareMobilKontakt,
        alt: 'Contact page request form with fields for name, email, phone, and message',
      },
      {
        src: loeffelholzCareMobilLeistungen,
        alt: 'Service grid showing non-emergency medical transport, wheelchair transport, and outings, each with an illustrated card',
      },
    ],
    alt: 'Löffelholz Care Mobil Website',
    title: 'Website for a Patient Transport Service',
    client: 'Löffelholz Care Mobil',
    topicTag: 'Web Design',
    tags: ['Webflow', 'Mobile-First', 'Frontend'],
    description: 'Löffelholz Care Mobil is the patient transport side of the Löffelholz Care family: non-emergency medical transport, wheelchair transport, and organized outings for people who need a driver they can rely on, not just a taxi. Like the main Löffelholz Care site, it\'s built mobile-first with large text, since most riders booking a ride are older and need to read the page comfortably. The site keeps the same visual language as the main site too (the "care" wordmark, the Speicherstadt hero, the same warm tone), so returning visitors recognize the brand instantly, and each site links to the other in the footer since many families need both services.\n\nThe site runs on Webflow, the same setup as the sister site, so the Löffelholz Care team can update service descriptions and job listings themselves. The Jobs page carries its own application form for driver positions, separate from the general contact form on Kontakt, since staffing drivers is an ongoing need for the business.',
    category: 'web',
    meta: [
      { label: 'Role', value: 'Concept, Design & Implementation' },
      { label: 'Timeframe', value: '2 weeks' },
      { label: 'Year', value: '2025' },
      { label: 'Tools', value: 'Figma, Webflow, GTM, Claude Code, Codex, MCP' },
    ],
  },
  {
    slug: '1300etc',
    image: etcCard,
    mobileImage: {
      src: etcMobile,
      alt: '1300ETC homepage on mobile, scrolled through the hero, vehicle info slider, stats banner and next-events cards',
    },
    images: [
      {
        src: etcHero,
        alt: '1300ETC homepage hero showing a grid of historic touring cars racing at Circuit de Spa-Francorchamps in the rain',
      },
      {
        src: etcTermine,
        alt: 'Race calendar detail cards for the 2026 season showing real dates, tracks and country flags for Spa, Hockenheim and Zolder',
      },
      {
        src: etcStrecken,
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
    meta: [
      { label: 'Role', value: 'Concept, Design & Implementation' },
      { label: 'Timeframe', value: '1 week' },
      { label: 'Year', value: '2026' },
      { label: 'Tools', value: 'Claude Code, Codex, VS Code, Figma, MCP, CLI' },
    ],
  },

  // Side Projects
  {
    slug: 'scorer',
    image: card5,
    alt: 'Scorer – iOS Darts App',
    title: 'Scorer',
    client: 'Get The Score Done',
    topicTag: 'Darts',
    tags: ['B2C', 'UI Design', 'iOS', 'Swift', 'MCP'],
    category: 'side',
    meta: [
      { label: 'Role', value: '' },
      { label: 'Timeframe', value: '' },
      { label: 'Year', value: '' },
      { label: 'Tools', value: '' },
    ],
  },
  {
    slug: 'my-website',
    image: nickringelmannCard,
    mobileImage: {
      src: nickringelmannMobile,
      alt: 'nickringelmann.com on mobile, scrolled through the hero, project grid, and approach sections',
    },
    images: [
      {
        src: nickringelmannHero,
        alt: 'nickringelmann.com homepage hero introducing Nick as a freelance product designer based in Hamburg',
      },
      {
        src: nickringelmannProjects,
        alt: 'nickringelmann.com projects section showing real client and side projects with their tags',
      },
      {
        src: nickringelmannApproach,
        alt: 'nickringelmann.com approach section listing six product design principles, from lean UX to sustainability',
      },
    ],
    alt: 'My Website',
    title: 'Rework of My Personal Website',
    client: 'nickringelmann.com',
    topicTag: 'Portfolio',
    tags: ['Astro', 'TypeScript', 'Frontend', 'UX Design', 'Self-Hosted Backend'],
    description: 'My own site is the one project where I\'m both client and designer, so I use it to test decisions before I\'d recommend them to anyone else. It\'s deliberately plain: no page builder, no component library pulled in from npm, a handful of Astro components and one stylesheet I can read start to finish. When I added a contact page, I skipped the usual third-party form service and built a small PHP backend instead, so a message sent through the form gets mailed straight from my own IONOS inbox rather than passing through someone else\'s server first.\n\nThe site runs on Astro 7 as a fully static build. I type project data in TypeScript and write blog posts in Markdown through Astro\'s Content Collections. Dark mode comes down to a single data attribute on the html tag: I persist it in localStorage and set it before paint so the page never flashes the wrong theme. Screenshots and photos go through Astro\'s image pipeline, which resizes everything to WebP with retina versions instead of me shipping full-resolution files. A GitHub Actions workflow builds the site and pushes it straight to IONOS shared hosting over SFTP on every push to main, so publishing a change is a single git push.',
    category: 'side',
    meta: [
      { label: 'Role', value: 'Concept, Design & Implementation' },
      { label: 'Timeframe', value: '1 week' },
      { label: 'Year', value: '2026' },
      { label: 'Tools', value: 'Claude Code, Codex, VS Code, Figma, MCP, CLI' },
    ],
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
    tags: [],
    category: 'side',
  },
  {
    alt: 'Hylla',
    title: 'Hylla',
    client: 'Coming soon',
    tags: [],
    category: 'side',
  },
]
