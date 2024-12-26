import { createRateLimiter, defaultRateLimiter } from './lib/ratelimiter'
import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { type NextRequest, NextResponse } from 'next/server'
import ALLOWED_ADMIN_IDS from './data/reviewers.json'

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const method = request.method
	const ip = request.ip ?? '127.0.0.1'
	const authToken = await getAuthTokenOrNull(
		request.headers.get('Authorization') ?? undefined
	)

	switch (pathname) {
		case '/packs/create': {
			if (!authToken) {
				const url = request.nextUrl.clone()
				url.pathname = '/login'
				return NextResponse.rewrite(url)
			}
			return NextResponse.next()
		}

		case '/packs/review': {
			if (!authToken) {
				const url = request.nextUrl.clone()
				url.pathname = '/login'
				return NextResponse.rewrite(url)
			}

			if (!ALLOWED_ADMIN_IDS.includes(authToken.payload.id)) {
				return NextResponse.json(
					{ success: false, error: 'Forbidden - Admin access required' },
					{ status: 403 }
				)
			}
			return NextResponse.next()
		}

		case '/api/packs/create': {
			if (!authToken) {
				return NextResponse.json(
					{ success: false, error: 'Unauthorized' },
					{ status: 401 }
				)
			}

			if (method === 'POST') {
				const { success: successID } = await createRateLimiter.limit(
					authToken.payload.id
				)
				const { success: successIP } = await createRateLimiter.limit(ip)

				if (!successID || !successIP) {
					return NextResponse.json(
						{
							success: false,
							error:
								'Rate limit exceeded, please wait a bit before trying again!'
						},
						{ status: 429 }
					)
				}
			}
			return NextResponse.next()
		}

		case '/api/packs/review': {
			if (!authToken) {
				return NextResponse.json(
					{ success: false, error: 'Unauthorized' },
					{ status: 401 }
				)
			}

			if (!ALLOWED_ADMIN_IDS.includes(authToken.payload.id)) {
				return NextResponse.json(
					{ success: false, error: 'Forbidden - Admin access required' },
					{ status: 403 }
				)
			}
			return NextResponse.next()
		}

		default: {
			// Handle /api/packs and other routes
			if (pathname.startsWith('/api/packs')) {
				if (method === 'GET') {
					const { success } = await defaultRateLimiter.limit(ip)
					if (!success) {
						return NextResponse.json(
							{
								success: false,
								error:
									'Rate limit exceeded, please wait a bit before trying again!'
							},
							{ status: 429 }
						)
					}
				} else if (!authToken) {
					return NextResponse.json(
						{ success: false, error: 'Unauthorized' },
						{ status: 401 }
					)
				}
			}
			return NextResponse.next()
		}
	}
}

export const config = {
	matcher: [
		'/packs/create',
		'/api/packs/review',
		'/api/packs',
		'/api/packs/:path*',
		'/api/packs/review/:path*',
		'/packs/review'
	]
}
