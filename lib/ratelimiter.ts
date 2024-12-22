import { Ratelimit } from '@upstash/ratelimit'
import { getRedis } from './redis'

const redis = await getRedis()

export const defaultRateLimiter = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(120, '60 s'),
	timeout: 10_000 // 10 seconds
})

export const createRateLimiter = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(6, '60 s'),
	timeout: 120_000 // 2 minutes
})
