import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { discordOAuthClient } from '@/helpers/oauth'
import type { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
	const token = await getAuthTokenOrNull()
	const redirectUrl = req.nextUrl.searchParams.get('redirect')
	const cookieStore = await cookies()

	if (token) {
		await Promise.allSettled([
			discordOAuthClient.revokeToken(
				token.payload.discord.access_token,
				'access_token'
			),
			discordOAuthClient.revokeToken(
				token.payload.discord.refresh_token,
				'refresh_token'
			)
		])
	}

	cookieStore.delete('OAUTH_TOKEN')
	cookieStore.delete('ID_TOKEN')

	return redirect(redirectUrl ?? '/')
}
