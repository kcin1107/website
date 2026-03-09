export interface ProjectProcessStep {
	title: string;
	description: string;
	image: string;
}

export interface Project {
	slug: string;
	title: string;
	client: string;
	tags: string[];
	outcome: string;
	summary: string;
	overview: string;
	challenge: string;
	approach: string[];
	impact: string[];
	process: ProjectProcessStep[];
}

const processTemplate: ProjectProcessStep[] = [
	{
		title: 'Discover',
		description: 'Interviewed users and reviewed journey pain points to define priorities.',
		image: '/images/process/discover.svg',
	},
	{
		title: 'Design',
		description: 'Mapped simplified flows and tested low-fidelity prototypes with stakeholders.',
		image: '/images/process/design.svg',
	},
	{
		title: 'Deliver',
		description: 'Shipped validated UI updates and tracked behavior changes after release.',
		image: '/images/process/deliver.svg',
	},
];

export const projects: Project[] = [
	{
		slug: 'boomerang-landing-page',
		title: 'Landing Page',
		client: 'Boomerang Systems',
		tags: ['Logistics', 'UI Design', 'Webflow', 'HTML', 'CSS', 'JavaScript'],
		outcome: '',
		summary: '',
		overview: '',
		challenge: '',
		approach: [],
		impact: [],
		process: processTemplate,
	},
	{
		slug: 'encavis-business-application',
		title: 'Business Application',
		client: 'Encavis AG',
		tags: ['Renewables', 'UX Design', 'UI Design', 'Design System', 'UX Research', 'SCRUM'],
		outcome: '',
		summary: '',
		overview: '',
		challenge: '',
		approach: [],
		impact: [],
		process: processTemplate,
	},
	{
		slug: 'loeffelholz-landing-page',
		title: 'Landing Page',
		client: 'Löffelholz Care',
		tags: ['Nursing', 'UI Design', 'Mobile-First', 'Webflow'],
		outcome: '',
		summary: '',
		overview: '',
		challenge: '',
		approach: [],
		impact: [],
		process: processTemplate,
	},
	{
		slug: '1300etc-landing-page',
		title: 'Landing Page',
		client: '1300ETC',
		tags: ['Motorsports', 'UI Design', 'Mobile-First', 'WordPress', 'HTML', 'CSS', 'JavaScript'],
		outcome: '',
		summary: '',
		overview: '',
		challenge: '',
		approach: [],
		impact: [],
		process: processTemplate,
	},
	{
		slug: 'boomerang-behavioral-design',
		title: '(Sustainable) Behavioral Design',
		client: 'Boomerang Systems',
		tags: ['Logistics', 'UX Design', 'UI Design', 'Shopify', 'UX Research', 'Heuristic Evaluation'],
		outcome: '',
		summary: '',
		overview: '',
		challenge: '',
		approach: [],
		impact: [],
		process: processTemplate,
	},
	{
		slug: 'scorer-ios-app',
		title: 'Scorer',
		client: 'Personal Project',
		tags: ['Darts', 'UX Design', 'UI Design', 'Swift', 'iOS', 'Mobile'],
		outcome: '',
		summary: '',
		overview: '',
		challenge: '',
		approach: [],
		impact: [],
		process: processTemplate,
	},
];
