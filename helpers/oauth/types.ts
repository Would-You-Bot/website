import { JWT } from 'oslo/jwt'

export type IdTokenData = {
	id: string
	avatar: string
	username: string
	global_name: string
	customerId: string
	exp: number
}

export interface IdTokenJWT extends JWT {
	payload: IdTokenData
}

export interface OAuthTokenData extends IdTokenData {
	discord: {
		access_token: string
		refresh_token: string
		exp?: number | null | undefined
	}
}

export interface OAuthTokenJWT extends JWT {
	payload: OAuthTokenData
}
