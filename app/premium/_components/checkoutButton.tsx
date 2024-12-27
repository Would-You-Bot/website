'use client'
import { ToastAction } from '@/components/ui/toast'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'
import { toast } from 'sonner'

interface CheckoutButtonProps {
	monthly: string
	serverId: string | undefined
	priceId: string
}

// sub button
export default function CheckoutButton({
	monthly,
	serverId,
	priceId
}: CheckoutButtonProps) {
	const [loading, setLoading] = useState(false)

	const handleCheckout = async () => {
		setLoading(true)
		const stripePromise = loadStripe(
			process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
		)
		const stripe = await stripePromise

		const response = await fetch('/api/subs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				priceId: priceId,
				monthly: monthly,
				serverId: serverId
			})
		})

		const data = await response.json()

		if (data?.action) {
			toast.error('Uh oh! Something went wrong.', {
				description: data.message,
				action: (
					<ToastAction
						onClick={() => window.open('/api/subs/manage', '_blank')}
						altText="Manage"
					>
						Manage
					</ToastAction>
				)
			})
			setLoading(false)
			return
		}

		if (
			data.status === 409 ||
			data.status === 422 ||
			data.status === 500 ||
			data.status === 401
		) {
			toast.error('Uh oh! Something went wrong.', { description: data.message })
			setLoading(false)
			return
		}

		const stripeSession = data as { id: string }
		await stripe?.redirectToCheckout({ sessionId: stripeSession.id })
		setLoading(false)
	}

	return (
		<button
			disabled={!serverId || loading}
			onClick={handleCheckout}
			className="ml-auto mt-4 flex w-fit items-center justify-center rounded-lg bg-brand-blue-100 px-5 py-1 text-sm font-bold leading-loose text-white disabled:cursor-not-allowed disabled:bg-background-darker disabled:text-foreground/40"
		>
			{loading ?
				<>
					<svg
						width="100"
						height="101"
						className="mr-2 inline h-4 w-4 animate-spin text-foreground"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_353_3030)">
							<path
								d="M100 50.5907C100 78.205 77.6142 100.591 50 100.591C22.3858 100.591 0 78.205 0 50.5907C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5907ZM9.08144 50.5907C9.08144 73.1894 27.4013 91.5092 50 91.5092C72.5987 91.5092 90.9186 73.1894 90.9186 50.5907C90.9186 27.9921 72.5987 9.67224 50 9.67224C27.4013 9.67224 9.08144 27.9921 9.08144 50.5907Z"
								fill="#171717"
							/>
							<path
								d="M93.9683 39.0409C96.3937 38.4038 97.8631 35.9116 97.0086 33.5539C95.2939 28.8227 92.8717 24.3692 89.8174 20.348C85.8459 15.1192 80.8833 10.7238 75.2131 7.41289C69.5429 4.10194 63.2761 1.94025 56.7705 1.05124C51.7673 0.367542 46.6983 0.446844 41.7352 1.27873C39.262 1.69328 37.8137 4.19778 38.4508 6.62326C39.088 9.04874 41.5701 10.4717 44.0512 10.1071C47.8518 9.54855 51.7198 9.52689 55.5409 10.0491C60.8649 10.7766 65.9935 12.5457 70.6338 15.2552C75.2742 17.9648 79.3354 21.5619 82.5856 25.841C84.9182 28.9121 86.8004 32.2913 88.1818 35.8758C89.0837 38.2158 91.5428 39.6781 93.9683 39.0409Z"
								fill="#0598F4"
							/>
						</g>
						<defs>
							<clipPath id="clip0_353_3030">
								<rect
									width="100"
									height="101"
									fill="white"
								/>
							</clipPath>
						</defs>
					</svg>
					Loading...
				</>
			:	'Checkout'}
		</button>
	)
}
