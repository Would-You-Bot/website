import { createRateLimiter, defaultRateLimiter } from './lib/ratelimiter'
import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { type NextRequest, NextResponse } from 'next/server'
import ALLOWED_ADMIN_IDS from './data/reviewers.json'

type RouteConfig = {
	requiresAuth: boolean
	requiresAdmin: boolean
	rateLimitType?: 'default' | 'create' | null
}

const ROUTE_CONFIGS: Record<string, RouteConfig> = {
	'/api/packs': {
		requiresAuth: false,
		requiresAdmin: false,
		rateLimitType: 'default'
	},
	'/api/packs/create': {
		requiresAuth: true,
		requiresAdmin: false,
		rateLimitType: 'create'
	},
	'/api/packs/review': {
		requiresAuth: true,
		requiresAdmin: true,
		rateLimitType: null
	},
	'/packs/create': {
		requiresAuth: true,
		requiresAdmin: false,
		rateLimitType: null
	},
	'/packs/review': {
		requiresAuth: true,
		requiresAdmin: true,
		rateLimitType: null
	}
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const method = request.method
	const ip = request.ip ?? '127.0.0.1'

	const routeConfig = Object.entries(ROUTE_CONFIGS).find(([route]) =>
		pathname.startsWith(route)
	)?.[1] ?? {
		requiresAuth: true,
		requiresAdmin: false,
		rateLimitType: null
	}

	if (method === 'GET' && !routeConfig.requiresAuth) {
		if (routeConfig.rateLimitType === 'default') {
			const { success } = await defaultRateLimiter.limit(ip)
			if (!success) {
				return NextResponse.json(
					{
						success: false,
						error: 'Rate limit exceeded, please wait a bit before trying again!'
					},
					{ status: 429 }
				)
			}
		}
		return NextResponse.next()
	}

	const authToken = await getAuthTokenOrNull(
		request.headers.get('Authorization') ?? undefined
	)

	if (routeConfig.requiresAuth && !authToken) {
		if (pathname.includes('/packs/')) {
			const url = request.nextUrl.clone()
			url.pathname = '/login'
			return NextResponse.rewrite(url)
		}
		return NextResponse.json(
			{ success: false, error: 'Unauthorized' },
			{ status: 401 }
		)
	}

	if (routeConfig.requiresAdmin && authToken) {
		const userId = authToken.payload.id
		if (!ALLOWED_ADMIN_IDS.includes(userId)) {
			return NextResponse.json(
				{ success: false, error: 'Forbidden - Admin access required' },
				{ status: 403 }
			)
		}
	}

	if (
		method === 'POST' &&
		routeConfig.rateLimitType === 'create' &&
		authToken
	) {
		const { success: successID } = await createRateLimiter.limit(
			authToken.payload.id
		)
		const { success: successIP } = await createRateLimiter.limit(ip)

		if (!successID || !successIP) {
			return NextResponse.json(
				{
					success: false,
					error: 'Rate limit exceeded, please wait a bit before trying again!'
				},
				{ status: 429 }
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
