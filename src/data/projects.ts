export interface ProjectProcessStep {
	title: string;
	description: string;
	image: string;
}

export interface Project {
	slug: string;
	title: string;
	client: string;
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
		slug: 'patient-portal-usability-overhaul',
		title: 'Patient Portal Usability Overhaul',
		client: 'Health startup',
		outcome: '31% improvement in task completion on appointment booking.',
		summary: 'Mapped the end-to-end journey and shipped a simplified account area.',
		overview:
			'A redesign of a fragmented patient portal focused on appointment booking, billing clarity, and account management.',
		challenge:
			'Patients were dropping off during booking and contacting support for routine account tasks that should have been self-service.',
		approach: [
			'Consolidated account actions into a single dashboard with clearer labels.',
			'Introduced progressive disclosure for insurance and billing steps.',
			'Prototyped and tested the booking flow with six existing patients.',
		],
		impact: [
			'31% increase in appointment booking task completion.',
			'22% reduction in support tickets about account settings.',
			'Faster internal handoff between product and engineering teams.',
		],
		process: processTemplate,
	},
	{
		slug: 'saas-onboarding-redesign',
		title: 'SaaS Onboarding Redesign',
		client: 'B2B analytics platform',
		outcome: 'Cut first-time setup time from 18 to 9 minutes.',
		summary: 'Designed a guided setup model with contextual assistance.',
		overview:
			'A first-run onboarding redesign for a complex analytics tool used by operations teams.',
		challenge:
			'New users faced too many configuration decisions at once and often abandoned setup before seeing value.',
		approach: [
			'Introduced a step-by-step onboarding wizard with defaults.',
			'Added inline help tied to each configuration decision.',
			'Reduced optional fields until after initial activation.',
		],
		impact: [
			'Setup time reduced from 18 to 9 minutes.',
			'Activation rate improved by 14 percentage points.',
			'Customer success team reported fewer repetitive setup calls.',
		],
		process: processTemplate,
	},
	{
		slug: 'checkout-optimization-sprint',
		title: 'Checkout Optimization Sprint',
		client: 'DTC retail brand',
		outcome: 'Increased conversion by 12% after rollout.',
		summary: 'Ran heuristic audit, redesigned form flows, and tested two variants.',
		overview:
			'A focused optimization sprint for a high-traffic checkout with known abandonment issues.',
		challenge:
			'Shoppers dropped out on address and payment steps due to form friction and unclear error messaging.',
		approach: [
			'Completed a rapid heuristic audit and analytics review.',
			'Refactored form fields to reduce cognitive load and input errors.',
			'Tested two checkout variants before full rollout.',
		],
		impact: [
			'12% conversion lift after rollout.',
			'Reduced form validation errors across mobile sessions.',
			'Improved checkout completion in first-time visitor segment.',
		],
		process: processTemplate,
	},
	{
		slug: 'mobile-banking-navigation-refresh',
		title: 'Mobile Banking Navigation Refresh',
		client: 'Regional credit union',
		outcome: 'Reduced support tickets related to transfers by 24%.',
		summary: 'Reworked the app IA and introduced clearer path labels for core actions.',
		overview:
			'A navigation refresh to make transfer, payment, and card controls easier to find in a mobile banking app.',
		challenge:
			'Members struggled to locate frequent actions, leading to support calls and incomplete transactions.',
		approach: [
			'Conducted card-sorting sessions to validate member mental models.',
			'Reorganized navigation around core tasks rather than internal product categories.',
			'Refined copy and icon labels for improved wayfinding.',
		],
		impact: [
			'24% reduction in support tickets for transfer issues.',
			'Higher successful transfer rate in first-session users.',
			'Improved satisfaction in post-release in-app survey.',
		],
		process: processTemplate,
	},
	{
		slug: 'subscription-retention-journey',
		title: 'Subscription Retention Journey',
		client: 'EdTech membership product',
		outcome: 'Lifted month-two retention by 9 percentage points.',
		summary: 'Designed a personalized re-engagement flow with targeted in-app nudges.',
		overview:
			'A retention-focused project to help new subscribers build consistent product habits in the first 30 days.',
		challenge:
			'Member engagement dropped sharply after the first week, with little guidance after initial setup.',
		approach: [
			'Mapped churn signals and key drop-off moments in lifecycle data.',
			'Designed contextual nudges tied to user progress and goals.',
			'Aligned in-app prompts with email reminders for continuity.',
		],
		impact: [
			'Month-two retention improved by 9 percentage points.',
			'Weekly active usage increased in early-lifecycle cohorts.',
			'Content completion rates improved in high-intent segments.',
		],
		process: processTemplate,
	},
	{
		slug: 'internal-tools-ux-audit',
		title: 'Internal Tools UX Audit',
		client: 'Operations team at logistics company',
		outcome: 'Cut average task handoff time by 17%.',
		summary: 'Prioritized workflow bottlenecks and shipped a simplified dispatch interface.',
		overview:
			'An audit and redesign of dispatch tools used by operations specialists during high-volume shifts.',
		challenge:
			'Frequent context switching and dense screens slowed down task handoffs and introduced avoidable errors.',
		approach: [
			'Observed shift operations and mapped decision points.',
			'Simplified dispatch screens and grouped related actions.',
			'Validated updates with pilot users before team-wide rollout.',
		],
		impact: [
			'17% faster average handoff time.',
			'Fewer manual correction steps in dispatch workflows.',
			'Improved usability feedback from the operations team.',
		],
		process: processTemplate,
	},
];
