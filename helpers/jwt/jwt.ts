import { createJWT, validateJWT } from 'oslo/jwt'
import { TimeSpan } from 'oslo'

const secret = Buffer.from(process.env.JWT_SECRET!)

export function signJwt(payload: Record<string, unknown>) {
	return createJWT('HS256', secret, payload, {
		expiresIn: new TimeSpan(1, 'd')
	})
}

export function verifyJwt(token: string) {
	return validateJWT('HS256', secret, token)
}
