import PageContent from './_components/PageContent'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Status - Would You Bot',
  description: 'The current status of the Would You clusters.',
  twitter: {
    title: 'Status - Would You Bot',
    description: 'The current status of the Would You clusters.'
  },
  openGraph: {
    title: 'Status - Would You Bot',
    description: 'The current status of the Would You clusters.'
  }
}
export const viewport: Viewport = {
  themeColor: '#0598F6',
  maximumScale: 5
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
