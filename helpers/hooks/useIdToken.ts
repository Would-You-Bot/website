import type { IdTokenJWT } from '@/helpers/oauth/types'
import { useCookies } from '@/helpers/hooks'
import { parseJWT } from 'oslo/jwt'
import { useMemo } from 'react'

export function useIdToken(defaultValue: IdTokenJWT | null): IdTokenJWT | null {
	const token = useCookies().get('ID_TOKEN')

	return useMemo(
		() => (token ? (parseJWT(token) as IdTokenJWT) : defaultValue),
		[defaultValue, token]
	)
}
