const { useState, useEffect } = require('react')
import Image from 'next/image'

interface AvatarProps {
	fallbackSrc: string
	src: string
	alt: string
	width?: number | `${number}` | undefined
	height?: number | `${number}` | undefined
	className?: string
	props?: any
}

const Avatar = ({ fallbackSrc, src, alt, ...props }: AvatarProps) => {
	const [error, setError] = useState(null)

	useEffect(() => {
		setError(null)
	}, [src])

	return (
		<Image
			onError={setError}
			alt={alt}
			draggable={false}
			src={error ? fallbackSrc : src}
			{...props}
		/>
	)
}

export default Avatar
