import PageContent from './_components/PageContent'
import Container from '@/components/Container'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Review Packs | Would You',
	description: 'Review question packs submitted by users'
}


async function Review() {
	const packs = await prisma.questionPack.findMany({
		where: {
			OR: [{ pending: true }, { denied: true }]
		},
		select: {
			type: true,
			id: true,
			name: true,
			pending: true,
			description: true,
			denied: true,
			questions: true
		},
		// Maybe paginate?
	})

	// Split results
	const denied = packs.filter((pack) => pack.denied)
	const pending = packs.filter((pack) => pack.pending)

	return (
		<Container className="pt-8 lg:pt-10 space-y-8 lg:space-y-10 min-h-[calc(100vh-112px)]">
			<h1 className="text-4xl font-bold">
				<span className="text-brand-red-100 drop-shadow-red-glow">
					Unreviewed
				</span>{' '}
				<span className="text-brand-blue-100 drop-shadow-blue-glow">Packs</span>
			</h1>
			<PageContent
				denied={denied}
				pending={pending}
			/>
		</Container>
	)
}

export default Review
