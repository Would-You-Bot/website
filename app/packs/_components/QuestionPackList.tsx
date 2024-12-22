'use client'

import QuestionPack, { QuestionPackProps } from './QuestionPack'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function QuestionPackList({
	packList,
	userId,
	isLoggedIn
}: {
	packList: QuestionPackProps[]
	userId: string | null
	isLoggedIn: boolean
}) {
	const searchParams = useSearchParams()
	const type = searchParams.get('type')

	return (
		<ul className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-10 lg:gap-x-12 xl:gap-x-14 max-md:max-w-[500px] max-md:mx-auto">
			{packList.map((question) => (
				<React.Fragment key={`pack-${question.id}`}>
					<QuestionPack
						{...question}
						userId={userId}
						style="default"
						isLoggedIn={isLoggedIn}
					/>
				</React.Fragment>
			))}
		</ul>
	)
}

export default QuestionPackList
