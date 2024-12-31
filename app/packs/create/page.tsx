import Container from '@/components/Container'
import PackForm from './_components/PackForm'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Create pack | Would You',
	description: 'Create question packs for your server'
}

function Create() {
	return (
		<Container className="pt-8 lg:pt-10 space-y-8 min-h-[calc(100vh-112px)]">
			<h1 className="text-4xl font-bold">
				<span className="text-brand-red-100 drop-shadow-red-glow">Create</span>{' '}
				<span className="text-brand-blue-100 drop-shadow-blue-glow">Pack</span>
			</h1>
			<Suspense fallback={<Loading />}>
				<PackForm />
			</Suspense>
		</Container>
	)
}

const Loading = () => (
	<div className="flex flex-1 items-center justify-center text-2xl">
		Loading...
	</div>
)

export default Create
