import { PackType } from '@prisma/client'
import { z } from 'zod'

const validTypes = z.nativeEnum(PackType, {
	message:
		'Invalid question type. Accepted types are: truth, dare, wouldyourather, neverhaveiever, whatwouldyoudo, wyr, nhie, wwyd, and topic.'
})

export const importQuestionSchemaA = z.record(
	validTypes,
	z.array(
		z
			.string({ message: 'Question must be a string' })
			.min(10, 'Make sure your question is at least 10 characters long')
			.max(300, 'Make sure your question is only 300 characters long'),
		{ message: 'Categories must contain an array of questions' }
	),
	{
		message:
			'Top level categories must be an object containing on or more of the keys truth, dare, wouldyourather, neverhaveiever, whatwouldyoudo, wwyd, or topic'
	}
)

export const importQuestionSchemaB = z.record(
	validTypes,
	z.array(
		z.object(
			{
				question: z
					.string({ message: 'Question must be a string' })
					.min(10, 'Make sure your question is at least 10 characters long')
					.max(300, 'Make sure your question is only 300 characters long'),
				id: z.string().optional()
			},
			{ message: 'Question must be an object with a question' }
		),
		{
			message:
				'Categories must contain an array of objects, that contain a question'
		}
	),
	{
		message:
			'Top level categories must be an object containing on or more of the keys truth, dare, wouldyourather, neverhaveiever, whatwouldyoudo, wwyd, or topic'
	}
)
