import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import type Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text()
    const signature = request.headers.get('stripe-signature')

    let event
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature!,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Webhook signature verification failed: ${error.message}`)
      } else {
        console.error(
          'Webhook signature verification failed with unknown error type.'
        )
      }
      return NextResponse.json(
        { message: 'Webhook Error', status: 400 },
        { status: 400 }
      )
    }

    switch (event.type) {
      // in the event of a successful checkout
      case 'customer.subscription.created':
        const subscription: Stripe.Subscription = event.data.object
        const userId = subscription.metadata?.userId
        const serverId = subscription.metadata?.serverId
        const tier =
          subscription.metadata?.monthly === 'true' ? 'monthly' : 'yearly'

        if (!userId || !serverId || !tier) {
          console.error('One or more variables are undefined.')
          return NextResponse.json(
            { message: 'One or more variables are missing', status: 400 },
            { status: 400 }
          )
        }
        try {
          await prisma.guild.upsert({
            where: {
              guildID: serverId
            },
            create: {
              guildID: serverId,
              premiumUser: userId,
              premium: 1,
              pending: true,
              premiumExpiration: new Date(
                subscription.current_period_end * 1000
              ),
              language: 'en_US'
            },
            update: {
              premiumUser: userId,
              premium: 1,
              pending: true,
              premiumExpiration: new Date(
                subscription.current_period_end * 1000
              )
            }
          })
        } catch (error) {
          console.error(error)
          return NextResponse.json(
            {
              message: 'An error occurred while updating the database.',
              status: 500
            },
            { status: 500 }
          )
        }
        break

      case 'invoice.paid':
      case 'invoice.payment_succeeded':
        const invoice: Stripe.Invoice = event.data.object

        if (invoice.subscription_details === null)
          return NextResponse.json(
            { message: 'No subscription details found', status: 400 },
            { status: 400 }
          )

        const userIdInvoice = invoice.subscription_details.metadata?.userId
        const serverIdInvoice = invoice.subscription_details.metadata?.serverId
        const tierInvoice =
          invoice.subscription_details.metadata?.monthly === 'true' ?
            'monthly'
          : 'yearly'

        if (!userIdInvoice || !serverIdInvoice || !tierInvoice) {
          console.error('One or more variables are undefined.')
          return NextResponse.json(
            { message: 'One or more variables are missing', status: 400 },
            { status: 400 }
          )
        }
        switch (invoice.billing_reason) {
          case 'subscription_create':
            try {
              await prisma.guild.update({
                // @ts-ignore
                where: {
                  guildID: serverIdInvoice
                },
                data: {
                  pending: false,
                  premiumExpiration: new Date(
                    invoice.lines.data[0].period.end * 1000
                  )
                }
              })
            } catch (error) {
              console.error(error)
              return NextResponse.json(
                {
                  message: 'An error occurred while updating the database.',
                  status: 500
                },
                { status: 500 }
              )
            }
            break
          case 'subscription_update':
            try {
              await prisma.guild.update({
                // @ts-ignore
                where: {
                  guildID: serverIdInvoice
                },
                data: {
                  pending: false,
                  premiumExpiration: new Date(
                    invoice.lines.data[0].period.end * 1000
                  )
                }
              })
            } catch (error) {
              console.error(error)
              return NextResponse.json(
                {
                  message: 'An error occurred while updating the database.',
                  status: 500
                },
                { status: 500 }
              )
            }
            break
        }
        break

      // in the event of a subscription being updated
      case 'customer.subscription.updated':
        const subscriptionUpdated: Stripe.Subscription = event.data.object
        const userIdUpdated = subscriptionUpdated.metadata?.userId
        const serverIdUpdated = subscriptionUpdated.metadata?.serverId
        const tierUpdated =
          subscriptionUpdated.metadata?.monthly === 'true' ?
            'monthly'
          : 'yearly'

        if (!userIdUpdated || !serverIdUpdated || !tierUpdated) {
          console.error('One or more variables are undefined.')
          return NextResponse.json(
            { message: 'One or more variables are missing', status: 400 },
            { status: 400 }
          )
        }

        await prisma.guild.update({
          // @ts-ignore
          where: {
            guildID: serverIdUpdated
          },
          data: {
            premium: 1,
            premiumExpiration: new Date(
              subscriptionUpdated.current_period_end * 1000
            )
          }
        })

        break

      // in the event of a subscription being deleted
      case 'customer.subscription.deleted':
        const subscriptionDeleted: Stripe.Subscription = event.data.object
        const userIdDeleted = subscriptionDeleted.metadata?.userId
        const serverIdDeleted = subscriptionDeleted.metadata?.serverId
        const tierDeleted =
          subscriptionDeleted.metadata?.monthly === 'true' ?
            'monthly'
          : 'yearly'

        if (!userIdDeleted || !serverIdDeleted || !tierDeleted) {
          console.error('One or more variables are undefined.')
          return NextResponse.json(
            { message: 'One or more variables are missing', status: 400 },
            { status: 400 }
          )
        }
        try {
          await prisma.guild.update({
            // @ts-ignore
            where: {
              guildID: serverIdDeleted
            },
            data: {
              premium: 0,
              premiumExpiration: null,
              premiumUser: null
            }
          })
        } catch (error) {
          console.error(error)
          return NextResponse.json(
            {
              message: 'An error occurred while updating the database.',
              status: 500
            },
            { status: 500 }
          )
        }

        break

      default:
        console.log('Unhandled event type:', event.type)
    }

    return NextResponse.json({ message: 'success', status: 'success' })
  } catch (error) {
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
