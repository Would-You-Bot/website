'use client'

import { JsonValue } from '@prisma/client/runtime/library'
import UnreviewedPack from './UnreviewedPack'
import { PackType } from '@prisma/client'
import { useState } from 'react'

type UnreviedPackData = {
	type: PackType
	id: string
	name: string
	description: string
	status: string
	questions: JsonValue[]
}

interface PageContentProps {
	pending: UnreviedPackData[]
}

function PageContent({ pending }: PageContentProps) {
	const [packs, setPacks] = useState({ pending })

	const refreshPacks = () => {
		// Maybe router.refresh() here?
		setPacks((current) => ({
			pending: [...current.pending].slice(1)
		}))
	}

	return (
		<section className="space-y-10">
			<div>
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
			</div>

			<div className="block h-px bg-border w-full" />
		</section>
	)
}

export default PageContent
