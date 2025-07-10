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
        const subscriptionData: Stripe.Subscription = event.data.object
        const serverId = subscriptionData.items.data[0].metadata.serverId

        if (!serverId) {
          return NextResponse.json(
            { message: 'One or more variables are missing', status: 400 },
            { status: 400 }
          )
        }

        const subscription = await stripe.subscriptions.search({
          query: `metadata['serverId']:'${serverId}'`
        })

        try {
          await prisma.guild.upsert({
            where: {
              guildID: serverId
            },
            create: {
              guildID: serverId,
              premiumUser: subscription?.data[0]?.metadata.userId,
              premium: 1,
              premiumExpiration: new Date(
                subscription.data[0].items.data[0].current_period_end * 1000
              ),
              language: 'en_US'
            },
            update: {
              premiumUser: subscription?.data[0]?.metadata.userId,
              premium: 1,
              premiumExpiration: new Date(
                subscription.data[0].items.data[0].current_period_end * 1000
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

        if (invoice === null)
          return NextResponse.json(
            { message: 'No subscription details found', status: 400 },
            { status: 400 }
          )
        const serverIdInvoice = invoice.metadata?.serverId

        if (!serverIdInvoice) {
          return NextResponse.json(
            { message: 'One or more variables are missing', status: 400 },
            { status: 400 }
          )
        }

        const subscriptionInvoice = await stripe.subscriptions.search({
          query: `metadata['serverId']:'${serverIdInvoice}'`
        })
        try {
          await prisma.guild.update({
            where: {
              guildID: serverIdInvoice
            },
            data: {
              pending: false,
              premiumExpiration: new Date(
                subscriptionInvoice.data[0].items.data[0].current_period_end * 1000
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

      // in the event of a subscription being updated
      case 'customer.subscription.updated':
        const subscriptionDataUpdated: Stripe.Subscription = event.data.object
        const serverIdUpdated = subscriptionDataUpdated.items.data[0].metadata.serverId

        if (!serverIdUpdated) {
          return NextResponse.json(
            { message: 'One or more variables are missing', status: 400 },
            { status: 400 }
          )
        }

        const subscriptionUpdated = await stripe.subscriptions.search({
          query: `metadata['serverId']:'${serverIdUpdated}'`
        })

        await prisma.guild.update({
          where: {
            guildID: serverIdUpdated
          },
          data: {
            premium: 1,
            premiumExpiration: new Date(
              subscriptionUpdated.data[0].items.data[0].current_period_end * 1000
            )
          }
        })

        break

      // in the event of a subscription being deleted
      case 'customer.subscription.deleted':
        const subscriptionDataDeleted: Stripe.Subscription = event.data.object
        const serverIdDeleted = subscriptionDataDeleted.items.data[0].metadata.serverId

        if (!serverIdDeleted) {
          console.error('One or more variables are undefined.')
          return NextResponse.json(
            { message: 'One or more variables are missing', status: 400 },
            { status: 400 }
          )
        }

        try {
          await prisma.guild.update({
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
