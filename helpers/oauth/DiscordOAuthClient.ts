import { generateState, OAuth2Client } from 'oslo/oauth2'

/**
 * @private
 */
class DiscordOAuthClient {
	private readonly client: OAuth2Client
	private readonly scopes: string[]
	private readonly clientSecret: string
	private readonly revocationUrl = 'https://discord.com/api/oauth2/token/revoke'

	constructor({
		clientId,
		clientSecret,
		redirectUri,
		tokenUrl,
		authorizeUrl,
		scopes
	}: {
		clientId: string
		authorizeUrl: string
		tokenUrl: string
		redirectUri: string
		clientSecret: string
		scopes: string[]
	}) {
		this.client = new OAuth2Client(clientId, authorizeUrl, tokenUrl, {
			redirectURI: redirectUri
		})
		this.scopes = scopes
		this.clientSecret = clientSecret
	}

	async createAuthorizationURL() {
		const state = generateState()
		const authorizationUrl = await this.client.createAuthorizationURL({
			state,
			scopes: this.scopes
		})
		authorizationUrl.searchParams.set('prompt', 'none')
		return authorizationUrl
	}

	validateAuthorizationCode(authorizationCode: string) {
		return this.client.validateAuthorizationCode(authorizationCode, {
			credentials: this.clientSecret,
			authenticateWith: 'request_body'
		})
	}

	refreshAccessToken(refreshToken: string) {
		return this.client.refreshAccessToken(refreshToken, {
			scopes: this.scopes,
			credentials: this.clientSecret,
			authenticateWith: 'request_body'
		})
	}

	revokeToken(token: string, tokenType: 'access_token' | 'refresh_token') {
		return fetch(this.revocationUrl, {
			method: 'POST',
			body: new URLSearchParams({
				token,
				token_type_hint: tokenType,
				client_id: this.client.clientId,
				client_secret: this.clientSecret
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
	}
}

export const discordOAuthClient = new DiscordOAuthClient({
	clientId: process.env.DISCORD_CLIENT_ID!,
	clientSecret: process.env.DISCORD_CLIENT_SECRET!,
	redirectUri: process.env.DISCORD_REDIRECT_URI!,
	tokenUrl: process.env.DISCORD_TOKEN_URL!,
	authorizeUrl: process.env.DISCORD_AUTHORIZE_URL!,
	scopes: ['identify', 'guilds']
})
