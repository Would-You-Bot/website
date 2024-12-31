import { Ratelimit } from '@upstash/ratelimit'
import { getRedis } from './redis'

export async function defaultRateLimiter() {
	const redis = await getRedis()
	return new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(120, '60 s'),
		timeout: 10_000 // 10 seconds
	})
}

export async function createRateLimiter() {
	const redis = await getRedis()
	return new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(6, '60 s'),
		timeout: 120_000 // 2 minutes
	})
}
