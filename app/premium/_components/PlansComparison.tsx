import { CheckIcon, CloseIcon } from './icons'

interface ArrayProps {
	criteria: string
	free: string | number | boolean
	premium: string | number | boolean
}

interface PlansComparisonProps {
	className?: string
	data: Array<ArrayProps>
	colSeparator?: boolean
	rowSeparator?: boolean
}

export default function PlansComparison({
	className,
	data,
	colSeparator,
	rowSeparator
}: PlansComparisonProps) {
	return (
		<section className="mx-auto flex h-auto w-full max-w-8xl flex-col text-foreground">
			<div className="mx-auto flex w-full max-w-8xl flex-col items-center justify-center">
				<div className="flex w-full flex-col items-center justify-center">
					<h2 className="text-center text-3xl font-bold sm:text-4xl">
						Plan Comparison
					</h2>
					<p className="mt-2 text-center">
						Compare the features of our free and premium plans
					</p>
				</div>
				<div className="mt-6 flex h-16 w-full rounded-t-3xl bg-background-light">
					<div className="text-bold flex w-full basis-1/3 items-center justify-center"></div>
					<div className="flex w-full basis-1/3 items-center justify-center">
						Free
					</div>
					<div className="flex w-full basis-1/3 items-center justify-center">
						Premium
					</div>
				</div>
				{data.map((item, index) => {
					return (
						<div
							key={index}
							className={`flex h-16 w-full ${rowSeparator && index != 0 ? 'border-t-2 border-background-light' : ''}`}
						>
							<div className="flex w-full basis-1/3 items-center justify-center px-2 text-center text-sm sm:text-base">
								{item.criteria}
							</div>
							<div
								className={`text-md flex w-full basis-1/3 items-center justify-center font-bold text-[#7A7B7E] ${colSeparator ? 'border-x-2 border-background-light' : ''}`}
							>
								{typeof item.free === 'boolean' ?
									item.free ?
										<CheckIcon className="h-5 w-5 text-[#7A7B7E] sm:h-7 sm:w-7" />
									:	<CloseIcon className="h-5 w-5 text-[#7A7B7E] sm:h-7 sm:w-7" />

								:	<span className="px-2 text-center text-sm sm:text-base">
										{item.free}
									</span>
								}
							</div>
							<div className="text-md flex w-full basis-1/3 items-center justify-center font-bold text-brand-customPrimary">
								{typeof item.premium === 'boolean' ?
									item.premium ?
										<CheckIcon className="h-5 w-5 text-brand-customPrimary sm:h-7 sm:w-7" />
									:	<CloseIcon className="h-5 w-5 text-brand-customPrimary sm:h-7 sm:w-7" />

								:	<span className="px-2 text-center text-sm sm:text-base">
										{item.premium}
									</span>
								}
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}
