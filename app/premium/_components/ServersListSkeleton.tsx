'use server'

import { Skeleton } from '@/components/ui/skeleton'

export async function ServersListSkeleton() {
	return (
		<>
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
			<ServersListItem />
		</>
	)
}

function ServersListItem() {
	return (
		<div className="flex h-10 items-center gap-2 rounded-sm px-2 transition hover:bg-white/5">
			<Skeleton className="h-8 w-8 rounded-full" />
			<Skeleton className="h-6 w-1/2 rounded-md" />
		</div>
	)
}
