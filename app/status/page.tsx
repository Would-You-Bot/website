import PageContent from './_components/PageContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Would You - Status'
}

const Status = async () => {
	let clusterData = null
	let error = null

	try {
		const cluster = await fetch(process.env.API_URL!, {
			method: 'GET',
			headers: {
				Authorization: process.env.API_KEY!
			},
			cache: 'no-cache'
		})

		if (!cluster.ok) {
			throw new Error(`Error fetching data: ${cluster.statusText}`)
		}

		clusterData = await cluster.json()
	} catch (err) {
		error = err instanceof Error ? err.message : 'An unexpected error occurred'
	}

	// Render fallback UI in case of error
	if (error) {
		return (
			<div className="flex justify-center items-center flex-1">
				<span className="text-2xl">Something went wrong</span>
			</div>
		)
	}

	// Render the actual content if the data is successfully fetched
	return <PageContent clusterData={clusterData} />
}

export default Status
