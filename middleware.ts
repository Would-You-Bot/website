import { createRateLimiter, defaultRateLimiter } from './lib/ratelimiter'
import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { type NextRequest, NextResponse } from 'next/server'
import ALLOWED_ADMIN_IDS from './data/reviewers.json'

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const method = request.method
	const ip = request.ip ?? '127.0.0.1'

	// Allow GET requests to /api/packs without being logged in or an admin
	if (
		method === 'GET' &&
		(pathname === '/api/packs' || pathname.startsWith('/api/packs/'))
	) {
		const { success } = await defaultRateLimiter.limit(ip)

		if (!success) {
			return NextResponse.json(
				{
					success: false,
					error: `Rate limit exceeded, please wait a bit before trying again!`
				},
				{ status: 429 }
			)
		}

		return NextResponse.next()
	}

	const token = await getAuthTokenOrNull(
		request.headers.get('Authorization') ?? undefined
	)

	if (
		pathname.includes('/packs/create') ||
		pathname.includes('/packs/review')
	) {
		if (token === null) {
			const url = request.nextUrl.clone()
			url.pathname = '/login'
			return NextResponse.rewrite(url)
		}
	}

	if (token === null) {
		return NextResponse.json(
			{ success: false, error: 'Unauthorized' },
			{ status: 401 }
		)
	}
	// Limiting by user ID and IP
	if (method === 'POST' && pathname === '/api/packs') {
		const { success: successID } = await createRateLimiter.limit(
			token.payload.id
		)
		const { success: successIP } = await createRateLimiter.limit(ip)

		if (!successID || !successIP) {
			return NextResponse.json(
				{
					success: false,
					error: `Rate limit exceeded, please wait a bit before trying again!`
				},
				{ status: 429 }
			)
		}
	}

	// For review routes, check if user has admin perms
	if (pathname.includes('/api/review') || pathname.includes('/packs/review')) {
		const userId = token.payload.id

		if (!ALLOWED_ADMIN_IDS.includes(userId)) {
			return NextResponse.json(
				{ success: false, error: 'Forbidden - Admin access required' },
				{ status: 403 }
			)
		}
	}

	return NextResponse.next()
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
