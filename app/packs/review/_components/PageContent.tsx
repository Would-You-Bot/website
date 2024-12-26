'use client'

import { JsonValue } from '@prisma/client/runtime/library'
import UnreviewedPack from './UnreviewedPack'
import { useRouter } from 'next/navigation'
import { PackType } from '@prisma/client'
import { FolderX } from 'lucide-react'
import { useState } from 'react'

type UnreviedPackData = {
	type: PackType
	id: string
	name: string
	description: string
	status: 'pending' | 'approved' | 'resubmit_pending' | 'denied'
	questions: JsonValue[]
}

interface PageContentProps {
	pending: UnreviedPackData[]
}

function PageContent({ pending }: PageContentProps) {
	const [packs, setPacks] = useState({ pending })
	const router = useRouter()

	const refreshPacks = () => {
		router.refresh()
		setPacks((current) => ({
			pending: [...current.pending].slice(1)
		}))
	}
	console.log(pending)
	return (
		<section className="space-y-10">
			<div>
				{packs.pending.length > 0 ?
					<ul className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-6">
						{packs.pending.map((pack) => (
							<UnreviewedPack
								key={pack.id}
								id={pack.id}
								name={pack.name}
								description={pack.description}
								type={pack.type}
								questions={pack.questions}
								onStatusChange={refreshPacks}
							/>
						))}
					</ul>
				:	<div>
						<div className="flex flex-col items-center justify-center h-[250px] lg:h-[400px] border rounded-md gap-4">
							<FolderX className="size-20 text-muted-foreground" />
							<p className="text-muted-foreground text-xl">
								No pending packs to show
							</p>
						</div>
					</div>
				}
			</div>
		</section>
	)
}

export default PageContent
