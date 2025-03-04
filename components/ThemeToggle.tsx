'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<button
			type="button"
			className="flex h-fit p-2 aspect-square rounded-[8px] items-center justify-center text-foreground/70 hover:text-foreground/90 hover:bg-foreground/5 transition"
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			{theme === 'light' ?
				<Moon className="w-6 h-6 sm:w-7 sm:h-7" />
			:	<Sun className="w-6 h-6 sm:w-7 sm:h-7" />}
		</button>
	)
}
