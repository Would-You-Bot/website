import type { OAuthTokenJWT } from '@/helpers/oauth/types'
import type { IdTokenJWT } from '@/helpers/hooks'
import { verifyJwt } from '@/helpers/jwt'
import { cookies } from 'next/headers'
import { parseJWT } from '@oslojs/jwt'

export async function getIdToken(
	inputToken?: string
): Promise<IdTokenJWT | null> {
	const cookieStore = await cookies()
	const tokenString = inputToken || cookieStore.get('ID_TOKEN')?.value
	return tokenString ? (parseJWT(tokenString) as IdTokenJWT) : null
}

/**
 * @desc Parses the current auth token as a JWT string and validates it,
 * including the signature, expiration, and not-before date.
 * Throws if the JWT is invalid or expired.
 * @param inputToken Optional token string that takes precedence over cookie value
 */
export async function getAuthToken(
	inputToken?: string
): Promise<OAuthTokenJWT> {
	const cookieStore = await cookies()
	const token = inputToken || cookieStore.get('OAUTH_TOKEN')?.value
	if (!token) {
		throw new MissingTokenException()
	}
	return verifyJwt(token) as Promise<OAuthTokenJWT>
}

/**
 * @desc Returns the validated auth token, or null if any error is thrown
 * (e.g. no token found, token is expired, invalid signature,...)
 * @param inputToken Optional token string that takes precedence over cookie value
 */
export const getAuthTokenOrNull = async (
	inputToken?: string
): Promise<OAuthTokenJWT | null> => {
	try {
		return await getAuthToken(inputToken)
	} catch (e) {
		console.error('Error getting auth token:', e)
		return null
	}
}

export abstract class OAuthException extends Error {}
export class MissingTokenException extends OAuthException {}
