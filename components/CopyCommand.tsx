'use client'

import { useEffect, useRef, useState } from 'react'
import { copy } from '@/utils/copy-to-clipboard'
import { cn } from '@/lib/utils'

interface CopyCommandWrapperProps {
	children: string
}

export default function CopyCommandWrapper({
	children
}: CopyCommandWrapperProps) {
	const initial = children
	const copyText = '--Click To Copy--'
	const [isHovered, setIsHovered] = useState(false)
	const [text, setText] = useState(initial)
	const wrapperRef = useRef<HTMLDivElement>(null)
	const [minWidth, setMinWidth] = useState(0)
	const [initialWidth, setInitialWidth] = useState(0)

	useEffect(() => {
		if (wrapperRef.current) {
			setMinWidth(wrapperRef.current.offsetWidth)
			setInitialWidth(wrapperRef.current.offsetWidth)
		}
	}, [initial])

	const updateMinWidth = () => {
		if (copyText.length > initial.length && wrapperRef.current) {
			setMinWidth(wrapperRef.current.offsetWidth)
		}
	}

	const handleCopyUsage = async (str: string) => {
		copy(str.split(' ')[0])
		setText('Copied!')
	}

	return (
		<div
			ref={wrapperRef}
			className="mb-2 w-fit rounded-md bg-background-light dark:bg-background-dark px-2 py-1 font-mono text-xs text-center"
			onMouseEnter={() => {
				setText('--Click To Copy--')

				setIsHovered(true)
			}}
			onMouseLeave={() => {
				setText(initial)
				setIsHovered(false)
				setMinWidth(initialWidth)
			}}
			onClick={(e) => {
				updateMinWidth()
				e.stopPropagation()
				handleCopyUsage(initial)
			}}
			style={{ minWidth: minWidth }}
		>
			<span className={cn(isHovered && 'text-foreground/50')}>{text}</span>
		</div>
	)
}
