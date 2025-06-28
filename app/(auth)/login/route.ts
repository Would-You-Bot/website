import { discordOAuthClient } from '@/helpers/oauth'
import { IdTokenData } from '@/helpers/oauth/types'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { signJwt } from '@/helpers/jwt'
import { setServer } from '@/lib/redis'
import { cookies } from 'next/headers'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { z } from 'zod'

const _queryParamsSchema = z.object({
  code: z.string().nullable(),
  error: z.string().nullable(),
  redirect: z.string().nullable()
})

export async function GET(req: NextRequest) {
  const cookieJar = cookies()
  const {
    code,
    error,
    redirect: redirectUrl
  } = await _queryParamsSchema.parseAsync({
    code: req.nextUrl.searchParams.get('code'),
    error: req.nextUrl.searchParams.get('error'),
    redirect: req.nextUrl.searchParams.get('redirect')
  })

  if (typeof code !== 'string') {
    if (error) {
      return redirect('/')
    } else {
      setSecureHttpOnlyCookie('OAUTH_REDIRECT', redirectUrl ?? '/')
      const oauthRedirect = await discordOAuthClient.createAuthorizationURL()
      return redirect(oauthRedirect.href)
    }
  }

  // TODO separate the rest of this in its own endpoint ? /callback ?
  const { success, user, access_token, refresh_token, exp } =
    await exchangeAuthorizationCode(code)

  if (!success) return

  const accessToken = await signJwt({
    ...user,
    discord: { access_token, refresh_token, exp }
  })
  const idToken = await signJwt({ ...user } as IdTokenData)

  setSecureHttpOnlyCookie('OAUTH_TOKEN', accessToken)
  cookieJar.set('ID_TOKEN', idToken, {
    path: '/',
    maxAge: 24 * 60 * 60
  })

  console.log(
    'info  - ' +
      `${user?.username ?? 'Unknown User'} (${user?.id ?? 'Unknown ID'})` +
      ' logged-in on ' +
      new Date().toUTCString()
  )
  return redirect(cookieJar.get('OAUTH_REDIRECT')?.value!)
}

async function exchangeAuthorizationCode(code: string) {
  const now = Date.now()
  try {
    const { access_token, token_type, scope, refresh_token, expires_in } =
      await discordOAuthClient.validateAuthorizationCode(code)
    const exp = expires_in ? now + 1000 * expires_in : null

    if (!scope?.includes('identify'))
      return { success: false, error: 'Identify scope is missing' }
    if (!scope?.includes('guilds'))
      return { success: false, error: 'Guilds scope is missing' }

    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `${token_type} ${access_token}`
      }
    })

    const user = await userResponse.json()

    const { id, username, avatar, global_name } = user

    const guildsResponse = await fetch(
      'https://discord.com/api/users/@me/guilds',
      {
        headers: {
          Authorization: `${token_type} ${access_token}`
        }
      }
    )

    const guilds = await guildsResponse.json()

    const finalGuilds = guilds.map((guild: any) => {
      return {
        id: guild.id,
        name: guild.name,
        icon: guild.icon
      }
    })

    // Cache the user's servers
    await setServer(id, finalGuilds)

    let customer: Stripe.ApiSearchResult<Stripe.Customer> | Stripe.Customer =
      await stripe.customers.search({
        query: `metadata["userID"]: "${id}"`,
        limit: 1
      })
    customer = customer?.data[0]
    if (!customer) {
      const newCustomer = await stripe.customers.create({
        name: username,
        metadata: {
          userID: id
        }
      })
      customer = newCustomer
    }

    if (scope.includes('guilds') && scope.includes('guilds.join')) {
      if (scope.includes('guilds.join') && guilds?.length <= 100) {
        await fetch(
          `https://discord.com/api/guilds/1009562516105461780/members/${id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token_type} ${access_token}`
            },
            body: JSON.stringify({
              access_token
            })
          }
        )
      }
    }

    return {
      success: true,
      exp,
      access_token,
      refresh_token,
      user: { id, avatar, username, global_name, customerId: customer.id }
    }
  } catch (error: unknown) {
    return { success: false, error: (error as any).message }
  }
}

function setSecureHttpOnlyCookie(name: string, value: string) {
  return cookies().set(name, value, {
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60
  })
}
