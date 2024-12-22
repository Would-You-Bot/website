import { cn } from '@/lib/utils'

function Container({
	className,
	children
}: {
	className?: string
	children: React.ReactNode
}) {
	return (
		<div className={cn('w-full max-w-8xl mx-auto px-8', className)}>
			{children}
		</div>
	)
}

export default Container
