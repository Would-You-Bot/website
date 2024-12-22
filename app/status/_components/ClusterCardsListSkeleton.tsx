'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export const ClusterCardsListSkeleton = ({
	clusters = 3
}: {
	clusters?: number
}) => {
	// Create an array of 3 clusters, each containing 10 items
	const data = Array.from({ length: clusters }, () =>
		Array.from({ length: 10 })
	)

	return (
		<div className="flex flex-wrap gap-8 justify-center">
			{data.map((cluster, clusterIndex) => {
				return (
					<Skeleton
						key={clusterIndex}
						className="basis-[calc(33.333%-1.5rem)] min-w-[280px] sm:min-w-[420px] space-y-4 bg-foreground/10 dark:bg-black/25 rounded-2xl p-4 sm:p-6"
					>
						<div className="flex gap-3 items-center text-xl font-bold text-foregorund">
							<Skeleton className="w-32 h-5 bg-foreground/15" />
							<Skeleton className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
						</div>
						<div
							className={cn(
								'flex flex-wrap gap-3 sm:gap-4',
								cluster.length > 5 && 'sm:justify-between'
							)}
						>
							{cluster.map((shard, shardIndex) => (
								<Skeleton
									key={shardIndex}
									className="w-10 h-10 sm:w-16 sm:h-16 bg-foreground/15 rounded-2xl flex items-center justify-center"
								/>
							))}
						</div>
					</Skeleton>
				)
			})}
		</div>
	)
}
