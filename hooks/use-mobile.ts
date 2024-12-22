import * as React from 'react'

const DEFAULT_BREAKPOINT = 768

interface UseIsMobileProps {
	BREAKPOINT: number | undefined
}

export function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${DEFAULT_BREAKPOINT - 1}px)`)
		const onChange = () => {
			setIsMobile(window.innerWidth < DEFAULT_BREAKPOINT)
		}
		mql.addEventListener('change', onChange)
		setIsMobile(window.innerWidth < DEFAULT_BREAKPOINT)
		return () => mql.removeEventListener('change', onChange)
	}, [])

	return !!isMobile
}
