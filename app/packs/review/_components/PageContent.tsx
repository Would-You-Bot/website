'use client'

import { JsonValue } from '@prisma/client/runtime/library'
import GlowingHeading from '@/components/GlowingHeading'
import UnreviewedPack from './UnreviewedPack'
import { PackType } from '@prisma/client'
import React from 'react'

type UnreviedPackData = {
	type: PackType
	id: string
	name: string
	pending: boolean
	description: string
	denied: boolean
	questions: JsonValue[]
}

interface PageContentProps {
	denied: UnreviedPackData[]
	pending: UnreviedPackData[]
}

function PageContent({ denied, pending }: PageContentProps) {
	const [packs, setPacks] = React.useState({ denied, pending })

	const refreshPacks = () => {
		// Maybe router.refresh() here?
		setPacks((current) => ({
			denied: [...current.denied],
			pending: [...current.pending].slice(1)
		}))
	}

	return (
		<section className="space-y-10">
			<div>
				{/* <h2 className="text-2xl font-semibold mb-4">Pending Review</h2> */}
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

			{packs.denied.length > 0 && (
				<div>
					<GlowingHeading
						redText="Previously"
						blueText="Rejected"
						level={3}
						className="text-2xl mb-6 font-semibold"
					/>
					<ul className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-6">
						{packs.denied.map((pack) => (
							<UnreviewedPack
								key={pack.id}
								id={pack.id}
								name={pack.name}
								description={pack.description}
								type={pack.type}
								questions={pack.questions}
								isDenied
							/>
						))}
					</ul>
				</div>
			)}
		</section>
	)
}

export default PageContent
