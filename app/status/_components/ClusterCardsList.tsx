'use client'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
import { ClusterStats, Status } from '../_interfaces'
import { cn } from '@/lib/utils'

interface ClusterCardProps {
	data: ClusterStats[]
}

export const ClusterCardsList = ({ data }: ClusterCardProps) => {
	// Flatten the cluster data to get all shards in a single array
	const allShards = data.flat()

	// Determine if any shard is selected
	const isAnyShardSelected = allShards.some((shard) => shard.selected)

	return (
		<div className="flex flex-wrap gap-8 justify-center">
			<TooltipProvider delayDuration={0}>
				{data.map((cluster, clusterIndex) => (
					<div
						key={clusterIndex}
						className="basis-[calc(33.333%-1.5rem)] min-w-[280px] xs:min-w-[360px] sm:min-w-[435px] space-y-4 bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6"
					>
						<div className="flex gap-3 items-center text-xl font-bold text-foreground">
							<span>Cluster {clusterIndex}</span>
							<span
								className={cn(
									'w-2.5 h-2.5 rounded-full',
									cluster.some((shard) => shard.status !== Status.Ready) ?
										'bg-status-yellow'
									: (
										cluster.every(
											(shard) => shard.status === Status.Disconnected
										)
									) ?
										'bg-status-red'
									:	'bg-status-green'
								)}
							></span>
						</div>
						<div
							className={cn(
								'flex flex-wrap gap-2 xs:gap-3 sm:gap-4',
								cluster.length > 5 && 'sm:justify-between'
							)}
						>
							{cluster.map((shard, index) => (
								<Tooltip key={shard.id}>
									<TooltipTrigger
										className={
											isAnyShardSelected && !shard.selected ?
												'pointer-events-none'
											:	undefined
										}
									>
										<div
											className={cn(
												'w-[43px] h-[43px] xs:w-14 xs:h-14 sm:w-16 sm:h-16 transition-all bg-foreground/5 rounded-lg xs:rounded-xl  sm:rounded-2xl flex items-center justify-center',
												shard.status === Status.Ready ?
													'text-status-green hover:bg-status-green/50 hover:text-foreground'
												: shard.status === Status.Disconnected ?
													'text-status-red hover:bg-status-red/50 hover:text-foreground'
												:	'text-status-yellow hover:bg-status-yellow/50 hover:text-foreground',
												shard.selected && 'ring-pulse', // Apply ring-pulse to the selected shard
												isAnyShardSelected &&
													!shard.selected &&
													'opacity-50 !text-foreground/50' // Apply global styles if any shard is selected
											)}
										>
											{index}
										</div>
									</TooltipTrigger>
									<TooltipContent className="border-0 rounded-xl px-4 py-2 hidden sm:flex">
										<div className="flex gap-3 text-sm sm:text-base">
											<div className="flex flex-col items-start gap-1 text-foreground/50">
												<span>Shard</span>
												<span>Status</span>
												<span>Ping</span>
											</div>
											<div className="flex flex-col items-start gap-1 text-foreground">
												<span>{shard.id}</span>
												<span>{Status[shard.status]}</span>
												<span
													className={cn(
														shard.ping > 0 ? 'text-status-green'
														: shard.ping > 500 ? 'text-status-yellow'
														: 'text-status-red'
													)}
												>
													{shard.ping}ms
												</span>
											</div>
										</div>
									</TooltipContent>
								</Tooltip>
							))}
						</div>
					</div>
				))}
			</TooltipProvider>
		</div>
	)
}
