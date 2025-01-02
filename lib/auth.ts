import { prismaAdapter } from '@wouldyou/better-auth/adapters/prisma'
import { createAuthMiddleware } from '@wouldyou/better-auth/api'
import { customSession } from '@wouldyou/better-auth/plugins'
import { betterAuth } from '@wouldyou/better-auth'
import { stripe } from '@/lib/stripe'
import { prisma } from './prisma'

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'mongodb'
	}),
	plugins: [
		customSession(async ({ user, session }) => {
			return {
				user: {
					name: user.name,
					id: user.id,
					image: user.image
				},
				session: {
					id: session.id,
					token: session.token
				}
			}
		})
	],
	advanced: {
		generateId: false
	},
	user: {
		fields: {
			name: 'displayName',
			image: 'avatarUrl'
		}
	},
	socialProviders: {
		discord: {
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
			scope: ['identify', 'guilds'],
      getUserInfo: async (account) => {
				const response = await fetch('https://discord.com/api/users/@me', {
					headers: {
						Authorization: `Bearer ${account.accessToken}`
					}
				})
				const profile = await response.json()
        console.log('profile', profile)
				return profile
			},
			mapProfileToUser: (profile) => {
				return {
					id: profile.id,
					language: 'en_EN',
					userID: profile.id,
					votePrivacy: false,
					emailVerified: false,
					profilePrivacy: false,
					likedPackPrivacy: false,
					globalName: profile.username,
					email: `${profile.username}@wouldyoubot.gg`,
					displayName: profile.global_name || profile.username,
					description:
						"We don't know much about this user yet, but they seem cool!",
					avatarUrl: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp`,
					bannerUrl:
						profile.banner ?
							`https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.png?size=480`
						:	null
				}
			}
		}
	},
	hooks: {
		after: createAuthMiddleware(async (ctx) => {
			// This hook is called after the user has been authenticated
			const profile = ctx.context.newSession

			const customerSearch = await stripe.customers.search({
				query: `metadata["userID"]: "${profile?.user.id}"`,
				limit: 1
			})
			if (!customerSearch.data.length) {
				await stripe.customers.create({
					name: profile?.user.globalName as string,
					metadata: {
						userID: profile?.user.id as string
					}
				})
			}
		})
	}
})

export type Auth = typeof auth
