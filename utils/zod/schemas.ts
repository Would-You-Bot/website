import { PackType } from '@prisma/client'
import z from 'zod'

export const userSchema = z.object({
	description: z
		.string()
		.min(10, 'Make sure your description is at least 10 characters long')
		.max(150, 'Make sure your description is only 150 characters long')
		.optional(),
	profilePrivacy: z.boolean().optional(),
	votePrivacy: z.boolean().optional(),
	likedPackPrivacy: z.boolean().optional()
})

export const questionSchema = z.object({
	question: z
		.string()
		.min(10, 'Make sure your question is at least 10 characters long')
		.max(300, 'Make sure your question is only 300 characters long'),
	type: z.nativeEnum(PackType, {
		required_error: 'Please select a valid question type',
		message: 'Please select a valid question type'
	})
})

export const editedPackSchema = z.object({
	name: z
		.string()
		.min(4, 'Make sure your packs name is at least 4 characters long')
		.max(100, 'Make sure your packs name is only 100 characters long'),
	description: z
		.string()
		.min(10, 'Make sure your packs description is at least 10 characters long')
		.max(500, 'Make sure your packs description is only 500 characters long'),
	tags: z
		.array(
			z
				.string()
				.min(4, 'Make sure your tag is at least 4 characters long')
				.max(50, 'Make sure your tag is only 50 characters long')
		)
		.min(1, 'At least one tag is required')
		.max(10),
	questions: z
		.array(questionSchema)
		.min(1, 'At least one question is required')
		.max(150, 'You can only have 100 questions in a pack')
})

export const packSchema = z.object({
	type: z.nativeEnum(PackType, {
		required_error: 'Please select a valid pack type',
		message: 'Please select a valid pack type'
	}),
	language: z.enum(['en_EN', 'de_DE', 'it_IT', 'fr_FR', 'es_ES'], {
		required_error: 'Please select a valid language',
		message: 'Please select a valid language'
	}),
	name: z
		.string()
		.min(4, 'Make sure your packs name is at least 4 characters long')
		.max(100, 'Make sure your packs name is only 100 characters long'),
	description: z
		.string()
		.min(10, 'Make sure your packs description is at least 10 characters long')
		.max(500, 'Make sure your packs description is only 500 characters long'),
	tags: z.array(z.string()).min(1, 'At least one tag is required').max(10),
	questions: z
		.array(questionSchema)
		.min(1, 'At least one question is required')
		.max(100, 'You can only have 100 questions in a pack')
})
export type PackData = z.infer<typeof packSchema>
