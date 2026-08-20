import type { ImageMetadata } from 'astro'

import card2 from '../assets/images/card2.png'

import boomerangCard from '../assets/images/project-card-boomerang-20260720.png'
import boomerangMobile from '../assets/images/projects/boomerang-mobile-20260721.jpg'
import boomerangLive from '../assets/images/projects/boomerang-live-20260720.png'
import boomerangBoxen from '../assets/images/projects/boomerang-boxen-20260721.png'
import boomerangTestimonial from '../assets/images/projects/boomerang-testimonial-20260721.png'

import boomerangNudgingCard from '../assets/images/project-card-boomerang-nudging-20260728.png'
import boomerangNudgingCartControl from '../assets/images/projects/boomerang-nudging-cart-control-20260728.png'
import boomerangNudgingShippingControl from '../assets/images/projects/boomerang-nudging-shipping-control-20260728.png'
import boomerangNudgingShippingRedesign from '../assets/images/projects/boomerang-nudging-shipping-redesign-20260728.png'
import boomerangNudgingCartRedesign from '../assets/images/projects/boomerang-nudging-cart-redesign-20260730.png'

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

import scorerAppIcon from '../assets/images/projects/scorer-app-icon-20260818.png'
import scorerSetupLight from '../assets/images/projects/scorer-setup-light-20260818.png'
import scorerResultLight from '../assets/images/projects/scorer-result-light-20260818.png'
import scorerGameLight from '../assets/images/projects/scorer-game-light-20260818.png'
import scorerGameDark from '../assets/images/projects/scorer-game-dark-20260818.png'
import scorerIPadSixPlayers from '../assets/images/projects/scorer-ipad-six-players-20260818.png'

import cleankeyAppIcon from '../assets/images/projects/cleankey-app-icon-20260818.png'
import cleankeyMenuActive from '../assets/images/projects/cleankey-menu-active-20260818.png'

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

export interface ProjectLink {
  label: string
  href?: string
  variant?: 'primary' | 'secondary'
  external?: boolean
  pending?: boolean
}

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
  | { kind: 'gallery'; title?: string; body?: string; caption?: string;
      columns: 2 | 3; presentation: 'portrait' | 'landscape' | 'device'; images: ProjectImage[] }
  | { kind: 'animation'; title?: string; body?: string; caption?: string; layout?: 'aside';
      src: string; poster: ProjectImage; alt: string; width: number; height: number }
  | { kind: 'annotated'; title?: string; body?: string; caption?: string;
      image: ProjectImage; items: { label: string; text: string }[] }
  | { kind: 'embed';   name: 'result-lines' | 'framing-nudge' | 'shipping-nudge';
      title?: string; body?: string; caption?: string; panel?: boolean }

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
  appIcon?: ProjectImage
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
  links?: ProjectLink[]
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
      { label: 'Role', value: 'End-to-End design and research process' },
      { label: 'Timeframe', value: '12 weeks' },
      { label: 'Year', value: '2023' },
      { label: 'Tools', value: 'Figma, Maze, jamovi, G*Power' },
    ],
    sections: [
      {
        kind: 'embed',
        name: 'result-lines',
        panel: true,
        title: 'TL;DR',
        body: 'Boomerang Systems sells reusable shipping packaging, and their widget for it already ran in live Shopify shops. In 2023 I audited that integration, then rebuilt the cart and the shipping step around a framing nudge and a social reference nudge. I tested both versions in Maze with 54 participants, split evenly and at random. The redesign more than doubled the share who ordered with reusable packaging.',
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
        body: 'Boomerang was the project partner, and their widget for adding reusable packaging to a Shopify cart had already shipped. That widget was the starting point, so the first thing I did was audit it.\n\nI looked at four Shopify shops running two reusable systems, RePack at Hopaal and Skhoop, Boomerang at Dirts and Kaala Yoga, and scored each against Nielsen\'s heuristics plus e-commerce criteria from Bonastre and Granollers and the Baymard Institute. The same four problems showed up in all of them, my partner\'s included.',
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
        kind: 'figure',
        image: {
          src: boomerangNudgingCartRedesign,
          alt: 'Redesigned cart on the demo shop tripsicher, headed Cart with a Continue shopping link, listing two line items, EcoVenture - 20L Rucksack from tripsicher at 99,99 euros and Deposit Reusable Packaging from Boomerang at 3,00 euros, both quantity 1. Below the line items sits the framing nudge on a cream panel: a green leaf icon and the bold green headline "Up to 80 percent less CO2 emissions than disposable packaging," a paragraph of body copy, and on the right three green check lines, Deposit 3 euros, Fold and drop in the letterbox, Deposit is automatically returned, the blue and white Mehrweg mark, and a pale green Use reusable packaging button. Underneath, a Sub-Total of 102,99 euros, the note incl. VAT plus shipping costs, and a black Checkout button',
        },
        caption: 'The redesigned cart, with the framing nudge dropped between the line items and the subtotal, so the explanation shows up right as the deposit turns into a line on the bill.',
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
    image: scorerAppIcon,
    appIcon: {
      src: scorerAppIcon,
      alt: '',
    },
    alt: 'The Scorer app icon, a dart inside a broken circle, on a warm off-white background',
    title: 'Scorer',
    client: 'Get The Score Done',
    topicTag: 'Darts',
    tags: ['B2C', 'Product Design', 'iOS', 'SwiftUI', 'CloudKit'],
    category: 'side',
    showOnHome: true,
    lead: 'A native X01 scorer for iPhone and iPad that keeps game night moving. Play locally with up to eight players, against a configurable bot, or online with a friend. No ads and no account.',
    meta: [
      { label: 'Role', value: 'Solo product design and iOS development' },
      { label: 'Timeframe', value: 'April 2025 to August 2026' },
      { label: 'Year', value: '2025 to 2026' },
      { label: 'Tools', value: 'Figma, Xcode, SwiftUI, CloudKit, Codex, Claude Code, MCP' },
    ],
    links: [
      { label: 'App Store (coming soon)', variant: 'secondary', pending: true },
    ],
    sections: [
      {
        kind: 'gallery',
        columns: 2,
        presentation: 'device',
        title: 'The game stays in front',
        body: 'During a leg every player keeps a card with their remaining score, live average, best visit and darts thrown. The active card follows the throwing order and picks up the checkout route as soon as one exists. Total entry runs through a large keypad, while dart-by-dart mode records the exact finish and rejects impossible visits before they reach the scoreline. Undo is one tap away.',
        images: [
          {
            src: scorerGameLight,
            alt: 'Scorer in light mode during a 501 Double Out match between Alex and Sam, with Alex on 170 and a T20 T20 Bull checkout suggestion',
          },
          {
            src: scorerGameDark,
            alt: 'The same in-progress Scorer match in dark mode, showing the active player treatment, checkout route, statistics and score keypad',
          },
        ],
      },
      {
        kind: 'prose',
        title: 'The scorer I wanted at the board',
        body: 'A darts scorer should take a score fast and then stay out of the way. I built Scorer for the nights when the next throw matters more than the phone on the table.\n\nThat kept the product local-first and quiet. The roster and preferences stay on the device, there is no Scorer account, and there are no ads or tracking SDKs. Online play is optional and sends only the match data two players need to stay in sync through CloudKit.',
      },
      {
        kind: 'gallery',
        columns: 2,
        presentation: 'portrait',
        title: 'Play your way',
        body: 'Setup covers the X01 formats I wanted around a board and stops there. Choose 301, 501 or 701, Straight, Double or Master Out, First to or Best of, and matches across legs and sets. Up to eight players share one phone. The bot plays ten calibrated levels between a 20 and a 110 average, and an online match needs a six-digit lobby code and no account. The app ships in eleven languages.',
        images: [
          {
            src: scorerSetupLight,
            alt: 'Scorer game setup on iPhone for a 501 Double Out match with Alex, Sam, Maya and Jon selected',
          },
          {
            src: scorerResultLight,
            alt: 'Scorer leg result on iPhone showing Alex and Sam with their averages, darts thrown and top scores',
          },
        ],
      },
      {
        kind: 'gallery',
        columns: 2,
        presentation: 'landscape',
        title: 'Native from phone to tablet',
        body: 'Scorer is one SwiftUI app with a layout per device. On iPhone the active players move through a horizontal carousel in portrait. iPad uses the extra room: player cards spread across the width, the keypad grows with the device, and landscape becomes a full game-board view. System appearance, six haptic strengths and the language setting carry across both.',
        images: [
          {
            src: scorerIPadSixPlayers,
            alt: 'Scorer on a 13-inch iPad in landscape at the start of a six-player 501 Double Out match, with a card per player across the full width and a wide three-column keypad below',
          },
        ],
      },
      {
        kind: 'prose',
        title: 'From prototype to v1.0',
        body: 'The first Scorer commit dates to April 2025. I came back for a rebuild in February 2026 and carried concept, product design, SwiftUI implementation and App Store release through to v1.0 build 8 in August. The app handles the rule cascade from visits to legs, sets and matches, plus a dart-by-dart bot that aims for the checkout routes it shows the player and misses into neighbouring beds. Optional CloudKit sessions keep an online match in sync.\n\nThis was my first shipped native iOS product. I used Codex and Claude Code alongside Xcode, the command line and MCP throughout the build. The product decisions, the darts rules and the visual system stayed mine.',
      },
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
    slug: 'cleankey',
    image: cleankeyAppIcon,
    appIcon: {
      src: cleankeyAppIcon,
      alt: '',
    },
    alt: 'Cleankey broom app icon on a warm beige background',
    title: 'Cleankey',
    client: 'Clean Your Keyboard',
    topicTag: 'Menu Bar Utility',
    tags: ['B2C', 'Product Design', 'macOS', 'SwiftUI', 'Open Source'],
    category: 'side',
    showOnHome: true,
    lead: 'A tiny native macOS menu bar utility that temporarily blocks every key, including modifiers, function keys and media controls, so you can wipe down a keyboard without accidental input.',
    meta: [
      { label: 'Role', value: 'Solo product design and macOS development' },
      { label: 'Timeframe', value: 'January 2026 to August 2026' },
      { label: 'Year', value: '2026' },
      { label: 'Tools', value: 'Xcode, Swift, SwiftUI, ApplicationServices, ServiceManagement, GitHub Actions, Codex, Claude Code, MCP' },
    ],
    links: [
      {
        label: 'Download v1.1',
        href: 'https://github.com/kcin1107/Cleankey/releases/tag/v1.1',
        variant: 'primary',
        external: true,
      },
      {
        label: 'View source',
        href: 'https://github.com/kcin1107/Cleankey',
        variant: 'secondary',
        external: true,
      },
    ],
    sections: [
      {
        kind: 'animation',
        layout: 'aside',
        src: '/assets/images/cleankey-demo-20260818.gif',
        poster: {
          src: cleankeyMenuActive,
          alt: 'Cleankey menu-bar popover with Keyboard Cleaning switched on',
        },
        alt: 'Cleankey menu-bar utility switching keyboard cleaning on and off',
        width: 960,
        height: 582,
        caption: 'One switch blocks the keyboard. The pointer stays live, so you can switch it off again.',
      },
      {
        kind: 'prose',
        title: 'A tiny fix for an irritating moment',
        body: 'Cleaning a keyboard while the Mac is awake usually means opening apps, typing nonsense, changing the volume or triggering a shortcut. Shutting down works, but it turns a quick wipe into a small ceremony. I wanted the utility I kept looking for: there when the cloth comes out, gone again afterwards.\n\nSo the whole product is one popover. The switch sits first, with an active state you cannot misread, and everything under it stays secondary. Cleankey runs as an accessory app, so it never shows up in the Dock or the app switcher. No window to arrange, no preferences to set up.',
      },
      {
        kind: 'annotated',
        title: 'Every row in the popover',
        image: {
          src: cleankeyMenuActive,
          alt: 'The Cleankey menu-bar popover with Keyboard Cleaning switched on, Open at Login enabled, both permission rows, an update check and the version and Quit row',
        },
        items: [
          {
            label: 'Keyboard Cleaning',
            text: 'The one control the app exists for. While it is on, Cleankey discards every key before the frontmost app sees it.',
          },
          {
            label: 'Open at Login',
            text: 'Registers the app through ServiceManagement, so it is back in the menu bar after a restart without a helper tool or a stray login item.',
          },
          {
            label: 'Input Monitoring',
            text: 'The first macOS permission, and the one that lets Cleankey see key events at all. Cleankey uses it only while blocking, and records or sends nothing you type. The row opens the exact pane in System Settings rather than a general privacy page.',
          },
          {
            label: 'Device Control and Data Access',
            text: 'The second permission. Seeing events is not enough to stop them, so this one lets the tap discard a key instead of passing it along.',
          },
        ],
      },
      {
        kind: 'prose',
        title: 'Blocking at the right level',
        body: 'A regular SwiftUI keyboard handler only sees input inside its own window. Cleankey installs a CGEvent tap at the HID level instead and discards keyboard events before the active app receives them, which covers ordinary typing along with command shortcuts, function keys, volume and playback controls. Mouse and trackpad events pass through on purpose. An app that can block every key can also lock you out of its own off switch.\n\nmacOS may disable an event tap after a timeout or a burst of input, so Cleankey watches for that and turns it back on. Nothing sits between the menu-bar switch and the system APIs. The universal v1.1 download is 225 KB of native Swift and SwiftUI, with no third-party packages in it.\n\nThose privileges do not fit the Mac App Store sandbox, so Cleankey ships as a free GitHub release, signed with a Developer ID certificate and notarized by Apple, for Macs on macOS 14 or later. The source is public, which is the point for a utility that asks to watch your keyboard. Update checks look at the same releases page and never install anything on their own.',
      },
      {
        kind: 'prose',
        title: 'From first commit to v1.0',
        body: 'The first commit landed in January 2026. By February the core interaction and the system-level blocking worked. The months to August went into the parts that turn that into a release: permission recovery, launch-at-login behavior, update checks, a universal build, code signing, notarization and an automated GitHub release workflow.\n\nI designed and built Cleankey solo, using Codex and Claude Code alongside Xcode, the command line and MCP. Version 1.1 build 8 keeps the constraint I started with: one switch, and nothing between a dirty keyboard and a clean one.',
      },
    ],
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
