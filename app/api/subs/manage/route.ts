import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET(req: Request, res: Response) {
	const user = await getAuthTokenOrNull()

	if (!user) {
		return NextResponse.json(
			{ message: 'You must be logged in to subscribe', status: 401 },
			{ status: 401 }
		)
	}

	const customerId = user?.payload?.customerId

	const customerSession = await stripe.billingPortal.sessions.create({
		customer: customerId,
		return_url: `${req.headers.get('referer')}/`
	})

	return redirect(customerSession.url)
}
