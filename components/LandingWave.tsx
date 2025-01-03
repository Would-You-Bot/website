import type { SVGProps } from 'react'
import React from 'react'

export function LandingWave(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 2560 397"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid slice"
			{...props}
		>
			<path
				fill="currentColor"
				d="M0 198.5L106.667 173.688C213.334 148.875 426.667 99.25 640.001 90.979C853.334 82.709 1066.67 115.792 1280 140.604C1493.33 165.417 1706.67 181.958 1920 157.146C2133.33 132.333 2346.67 66.166 2453.33 33.083L2560 0V397H0V198.5Z"
			/>
		</svg>
	)
}
