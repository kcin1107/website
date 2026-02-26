import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.union([z.date(), z.string()]).transform((value, ctx) => {
			const normalized =
				typeof value === 'string' ? value.replace(/\b(\d{1,2})(st|nd|rd|th)\b/gi, '$1') : value;
			const parsed = normalized instanceof Date ? normalized : new Date(normalized);
			if (Number.isNaN(parsed.getTime())) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Invalid date. Use YYYY-MM-DD or a parseable date string.',
				});
				return z.NEVER;
			}
			return parsed;
		}),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };
