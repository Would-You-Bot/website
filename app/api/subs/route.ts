import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { NextResponse } from 'next/server'
import connectDb from '@/lib/mongodb'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

interface StripeSubscriptionRequest {
  monthly: string
  serverId: string
  priceId: string
}

export async function POST(req: Request) {
  await connectDb()

  const user = await getAuthTokenOrNull()

  if (!user) {
    return NextResponse.json(
      { message: 'You must be logged in to subscribe', status: 401 },
      { status: 401 }
    )
  }

  const userId = user?.payload?.id

  const { priceId, serverId, monthly } =
    (await req.json()) as StripeSubscriptionRequest

  const server = await prisma.guild.findFirst({
    where: {
      guildID: serverId
    },
    select: {
      premiumExpiration: true
    }
  })

  if (!serverId) {
    return NextResponse.json(
      { message: 'Missing ServerId Parameter', status: 422 },
      { status: 422 }
    )
  }

  if (!priceId) {
    return NextResponse.json(
      { message: 'Missing PriceId Parameter', status: 422 },
      { status: 422 }
    )
  }

  if (!userId) {
    return NextResponse.json(
      { message: 'Missing UserId Parameter', status: 422 },
      { status: 422 }
    )
  }

  if (!monthly) {
    return NextResponse.json(
      { message: 'Missing Monthly Parameter', status: 422 },
      { status: 422 }
    )
  }

  if (server && server?.premiumExpiration !== null) {
    return NextResponse.json(
      {
        message: 'This server already has an active premium subscription',
        status: 409,
        action: true
      },
      { status: 409 }
    )
  }

  const jwt = await getAuthTokenOrNull()

  try {
    const session = await stripe.checkout.sessions.create({
      customer: jwt?.payload?.customerId ? jwt.payload.customerId : undefined,
      subscription_data: {
        metadata: {
          priceId: priceId,
          userId: userId,
          serverId: serverId,
          monthly: monthly
        }
      },
      allow_promotion_codes: true,
      payment_method_types: ['card', 'paypal', 'link'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: 'subscription',

      // normally you would redirect to a succes page/onboarding page
      success_url: `${req.headers.get('referer')}/success?type=${monthly ? 'monthly' : 'annualy'}&server=${serverId}`,

      cancel_url: `${req.headers.get('referer')}`
    })

    return NextResponse.json({ id: session.id })
  } catch (error: unknown) {
    console.error(error)
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, status: 500 },
        { status: 500 }
      )
    } else {
      return NextResponse.json(
        { message: 'An unknown error occurred', status: 500 },
        { status: 500 }
      )
    }
  }
}
