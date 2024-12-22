import { useIsClient } from '@/helpers/hooks/useIsClient'
import { useMemo } from 'react'

export function useCookies() {
	const isClient = useIsClient()
	const cookies_ = isClient ? window?.document?.cookie : ''

	return useMemo(() => {
		return cookies_.split(';').reduce((acc, cookie) => {
			const [key, value] = cookie.split('=')
			acc.set(key.trim(), value)
			return acc
		}, new Map<string, string>())
	}, [cookies_])
}
