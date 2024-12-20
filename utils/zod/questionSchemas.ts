import { z } from 'zod'

const validTypes = z.union([
  z.literal('truth'),
  z.literal('dare'),
  z.literal('wouldyourather'),
  z.literal('neverhaveiever'),
  z.literal('whatwouldyoudo'),
  z.literal('topic')
])

export const importQuestionSchemaA = z.record(validTypes, z.array(z.string()))

export const importQuestionSchemaB = z.record(
  validTypes,
  z.array(z.object({ question: z.string(), id: z.string().optional() }))
)
