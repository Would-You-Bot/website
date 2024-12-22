import { questionPacks } from '@/lib/constants'
import UnreviewedPack from './UnreviewedPack'
import React from 'react'

function PageContent() {
	return (
		<section>
			<ul className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-10 lg:gap-x-12 xl:gap-x-16">
				{questionPacks.slice(3, 9).map((question) => (
					<React.Fragment key={`pack-${question.id}`}>
						<UnreviewedPack pack={{ ...question }} />
					</React.Fragment>
				))}
			</ul>
		</section>
	)
}

export default PageContent
