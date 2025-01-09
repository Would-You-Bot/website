'use client'

import { Button, type ButtonProps } from '@/components/ui/button'
import { Fragment, useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { LoadingSvg } from '@/icons/loading'
import { toast } from 'sonner'
import axios from 'axios'

interface CheckoutButtonProps extends ButtonProps {
	monthly: string
	serverId: string | undefined
	priceId: string
	loading?: boolean
}

// sub button
export default function CheckoutButton({
	monthly,
	serverId,
	priceId,
	loading
}: CheckoutButtonProps) {
	const [isLoading, setIsLoading] = useState(loading)

	const handleClick = async () => {
		setIsLoading(true)
		await handleCheckout()
	}

	const handleCheckout = async () => {
		const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
		if (!stripeKey) throw new Error('Stripe key not found')

		const stripePromise = loadStripe(stripeKey)
		const stripe = await stripePromise

		toast.promise(
			axios.post('/api/subs', {
				priceId,
				monthly,
				serverId
			}),
			{
				loading: 'Checking out...',
				success: async (data) => {
					const stripeSession = data.data
					await stripe?.redirectToCheckout({ sessionId: stripeSession.id })
					return 'Checkout successful'
				},
				error: () => {
					return 'Uh oh! Something went wrong.'
				},
				description(data) {
					console.log(data)
					if (data instanceof Error) return data.message

					return 'Your subscription has been created successfully.'
				},
				action: (
					<Button onClick={() => window.open('/api/subs/manage', '_blank')}>
						Manage
					</Button>
				)
			}
		)
	}

	useEffect(() => {
		setIsLoading(loading)
	}, [loading])

	return (
		<button
			type="button"
			className="ml-auto mt-4 flex w-fit items-center justify-center rounded-lg bg-brand-blue-100 px-5 py-1 text-sm font-bold leading-loose text-white disabled:cursor-not-allowed disabled:bg-background-darker disabled:text-foreground/40"
			onClick={handleClick}
			disabled={isLoading ? isLoading : !serverId}
		>
			{isLoading ?
				<Fragment>
					<LoadingSvg />
					Loading...
				</Fragment>
			:	'Checkout'}
		</button>
	)
}
