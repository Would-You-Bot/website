/**
 * Rate limiting helper functions to enforce API request limits.
 * @module rateLimit
 */

import { Ratelimit } from '@upstash/ratelimit'
import { redis } from '@/helpers/redis'

/**
 * Creates a default rate limiter with a sliding window limit of 120 requests per 60 seconds.
 * @returns {Promise<Ratelimit>} A promise that resolves to the rate limiter instance.
 */
export async function defaultRateLimiter() {
	return new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(120, '60 s'),
		timeout: 10_000 // 10 seconds
	})
}

/**
 * Creates a custom rate limiter with a sliding window limit of 6 requests per 60 seconds.
 * @returns {Promise<Ratelimit>} A promise that resolves to the rate limiter instance.
 */
export async function createRateLimiter() {
	return new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(6, '60 s'),
		timeout: 120_000 // 2 minutes
	})
}
