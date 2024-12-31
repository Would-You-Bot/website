import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'

export default async function Premium(props: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const searchParams = await props.searchParams
	const type = searchParams.type ? (searchParams.type as string) : 'unknown'
	const serverId =
		searchParams.server ? (searchParams.server as string) : 'unknown'

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
					Your payment for Would You Premium billed <b>{type}</b> was
					successful!
				</p>
				{
					// TODO: Add space between the premium text
				}
				<Link
					href={`https://discord.com/channels/${serverId}/`}
					target="_blank"
					className="group outline-transparent"
				>
					<Button
						className="w-fit group-focus-within:ring-2 group-focus-within:ring-offset-2 group-focus-within:ring-brand-primary"
						tabIndex={-1}
					>
						Click to visit your new <b>Premium</b> server
						<ExternalLink className="size-4 ml-2" />
					</Button>
				</Link>
			</main>
		</>
	)
}
