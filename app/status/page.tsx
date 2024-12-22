import PageContent from './_components/PageContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Would You - Status'
}

const Status = async () => {
	const cluster = await fetch(process.env.API_URL!, {
		method: 'GET',
		headers: {
			Authorization: process.env.API_KEY!
		},
		cache: 'no-cache'
	})

	const clusterData = await cluster.json()

	return <PageContent clusterData={clusterData} />
}

export default Status
