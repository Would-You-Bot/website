// TODO remove the use client directive in favor of a server component
'use client'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Head from 'next/head'

export default function Premium() {
	const searchParams = useSearchParams()

	const type = searchParams.get('type')
	const serverId = searchParams.get('server')

	return (
		<>
			<Head>
				<title>Would You - Commands</title>
			</Head>
			<main className="flex flex-1 flex-col items-center justify-center gap-8 px-8 text-foreground">
				<h1 className="mt-36 text-center text-6xl font-bold text-brand-blue-100 drop-shadow-blue-glow">
					Payment Successful!
				</h1>
				<p className="mb-4 text-lg text-foreground">
					Your payment for Would You Premium billed{' '}
					<b>{type === 'monthly' ? 'monthly' : 'annually'}</b> was successful!
				</p>
				{
					// TODO: Add space between the premium text
				}
				<Button
					className="w-fit"
					onClick={() =>
						window.open(`https://discord.com/channels/${serverId}/`, '_blank')
					}
				>
					<span>
						Click to visit your new <b>Premium</b> server
					</span>
				</Button>
			</main>
		</>
	)
}
