import Button from '@/components/Button'
import { NextPage } from 'next'
import Link from 'next/link'

const NotFound: NextPage = () => {
	return (
		<div className="mx-auto my-56 flex w-full max-w-8xl flex-1 flex-col items-center justify-center px-8 text-foreground">
			<h1 className="text-5xl font-bold">
				Error{' '}
				<span className="text-brand-red-100 drop-shadow-red-glow">404</span>
			</h1>
			<p className="mt-4 text-lg text-foreground/70">
				The page you requested does not exist.
			</p>

			<Button
				variant="red"
				className="mt-8"
			>
				<Link href="/">Home</Link>
			</Button>
		</div>
	)
}

export default NotFound
