import { prismaAdapter } from 'better-auth/adapters/prisma'
import { createAuthMiddleware } from 'better-auth/api'
import { customSession } from 'better-auth/plugins'
import { betterAuth } from 'better-auth'
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
          image: user.image,
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

				return {
					user: {
						id: profile.id,
						name: profile.global_name || profile.username,
						image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp`,
						username: profile.username,
			      emailVerified: false,
					},
					data: profile
				}
			}
			// profile(profile) {
			// 	return {
			// 		id: profile.id,
			// 		name: profile.global_name || profile.username,
			// 		image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp`,
			// 		username: profile.username,
			// 		banner: profile.banner ?
			// 			`https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.png?size=480`
			// 			: null
			// 	}
			// }
		}
	},
	
	hooks: {
		after: createAuthMiddleware(async (ctx) => {
			// console.log('User logged in:', ctx)

			// Update or create user profile
			// await prisma.user.upsert({
			//   where: { userID: profile.id },
			//   update: {
			//     displayName: profile.global_name || profile.username,
			//     avatarUrl: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp`,
			//     globalName: profile.username,
			//     bannerUrl: profile.banner ?
			//       `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.png?size=480`
			//       : null
			//   },
			//   create: {
			//     userID: profile.id,
			//     displayName: profile.global_name || profile.username,
			//     avatarUrl: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp`,
			//     globalName: profile.username,
			//     description: "We don't know much about this user yet, but they seem cool!",
			//     language: 'en_EN',
			//     bannerUrl: profile.banner ?
			//       `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.png?size=480`
			//       : null,
			//     votePrivacy: false,
			//     profilePrivacy: false,
			//     likedPackPrivacy: false
			//   }
			// })

			// Handle Stripe customer creation
			// const customerSearch = await stripe.customers.search({
			//   query: `metadata["userID"]: "${profile.id}"`,
			//   limit: 1
			// })

			// if (!customerSearch.data.length) {
			//   await stripe.customers.create({
			//     name: profile.username,
			//     metadata: {
			//       userID: profile.id
			//     }
			//   })
			// }

		})
	}
})

export type Auth = typeof auth
