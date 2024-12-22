export interface DiscordGuild {
	id: string
	name: string
	icon: string
	owner: boolean
	permissions: number
	permissions_new: string
	features: string[]
}
export type PricingData = {
	price: { monthly: number; yearly: number }
	premium: {
		[key: string]: boolean
	}
}
