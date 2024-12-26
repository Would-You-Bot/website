import { PackType } from '@prisma/client'

export type PackLanguage = 'en_EN' | 'de_DE' | 'it_IT' | 'fr_FR' | 'es_ES'

export const packMap: Record<PackType, string> = {
	wouldyourather: 'Would You Rather',
	neverhaveiever: 'Never Have I Ever',
	whatwouldyoudo: 'What Would You Do',
	truth: 'Truth',
	dare: 'Dare',
	topic: 'Topic',
	mixed: 'Mixed'
}
