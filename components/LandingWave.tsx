import type { SVGProps } from 'react'
import React from 'react'

export function LandingWave(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="2560"
			height="397"
			{...props}
		>
			<path
				fill="currentColor"
				d="m-.429 198.5 106.667-24.812c106.667-24.813 320-74.438 533.334-82.709 213.333-8.27 426.666 24.813 640 49.625 213.333 24.813 426.667 41.354 640 16.542 213.333-24.813 426.667-90.98 533.333-124.063L2559.572 0v397H-.429V198.5z"
			/>
		</svg>
	)
}
