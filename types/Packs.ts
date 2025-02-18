import { PackType } from '@prisma/client'
import { PackLanguage } from '.'

export interface PackResponse {
	data: {
		type: PackType
		id: string
		language: PackLanguage
		popular: boolean
		name: string
		description: string
		tags: string[]
		likes: string[]
		questions: Array<{
			id: string
			type: Exclude<PackType, 'mixed'>
			question: string
		}>
		authorId: string
	}
	status: string
	likes: number
	userLiked: boolean
}
