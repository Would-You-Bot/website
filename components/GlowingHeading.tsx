import { cn } from '@/lib/utils'
import React from 'react'

interface GlowingHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  redText: string
  blueText: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

function GlowingHeading({ redText, blueText, level = 1, ...props }: GlowingHeadingProps) {
  return React.createElement(
    `h${level}`,
    { ...props, className: cn('text-4xl font-semibold', props.className) },
    <>
      <span className="text-brand-red-100 drop-shadow-red-glow">
        {redText}
      </span>{" "}
      <span className="text-brand-blue-100 drop-shadow-blue-glow">
        {blueText}
      </span>
    </>
  )
}

export default GlowingHeading
