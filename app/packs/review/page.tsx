import PageContent from './_components/PageContent'
import Container from '@/components/Container'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Review Packs | Would You',
	description: 'Review question packs submitted by users'
}

function page() {
	const role = 'admin'
	if (role !== 'admin') return redirect('/packs') // just a sample

	return (
		<Container className="pt-8 lg:pt-10 space-y-8 lg:space-y-10 min-h-[calc(100vh-112px)]">
			<h1 className="text-4xl font-bold">
				<span className="text-brand-red-100 drop-shadow-red-glow">
					Unreviewed
				</span>{' '}
				<span className="text-brand-blue-100 drop-shadow-blue-glow">Packs</span>
			</h1>
			<PageContent />
		</Container>
	)
}

export default page
