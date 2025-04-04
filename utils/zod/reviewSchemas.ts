import { z } from 'zod'

export const reviewQuestionSchema = z.object(
	{
		id: z.string(),
		approved: z.boolean(),
		message: z.string().optional()
	},
	{ message: 'Review question schema must contain an id and a boolean' }
)
