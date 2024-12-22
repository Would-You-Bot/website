import { z } from 'zod'

const validTypes = z.union([
  z.literal('truth'),
  z.literal('dare'),
  z.literal('wouldyourather'),
  z.literal('neverhaveiever'),
  z.literal('whatwouldyoudo'),
  z.literal('wwyd'), // alias for whatwouldyoudo
  z.literal('topic')
])

export const importQuestionSchemaA = z.record(
  validTypes,
  z.array(
    z
      .string()
      .min(10, 'Make sure your question is at least 10 characters long')
      .max(300, 'Make sure your question is only 300 characters long')
  )
)

export const importQuestionSchemaB = z.record(
  validTypes,
  z.array(
    z.object({
      question: z
        .string()
        .min(10, 'Make sure your question is at least 10 characters long')
        .max(300, 'Make sure your question is only 300 characters long'),
      id: z.string().optional()
    })
  )
)
