/**
 * Redis helper functions to interact with a Redis instance.
 * @module redis
 */

'use server'

import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import type { DiscordGuild } from '@/app/premium/_types'
import { redis } from '@/helpers/redis'

/**
 * Adds a key-value pair to Redis.
 * @param {string} key - The key to store in Redis.
 * @param {unknown} value - The value to store in Redis.
 * @returns {Promise<void>} A promise that resolves when the data is added to Redis.
 * @throws Will throw an error if adding data to Redis fails.
 */
const add = async (key: string, value: unknown): Promise<void> => {
	try {
		await redis.set(key, JSON.stringify(value))
	} catch (error) {
		console.error(`Failed to add key "${key}" to Redis:`, error)
		throw error
	}
}

/**
 * Retrieves a value from Redis.
 * @param {string} key - The key to retrieve from Redis.
 * @template T The type of the returned value.
 * @returns {Promise<T | null>} The value stored in Redis, or null if not found.
 * @throws Will throw an error if retrieving data from Redis fails.
 */
const get = async <T>(key: string): Promise<T | null> => {
	try {
		const data = (await redis.get(key)) as T
		return data
	} catch (error) {
		console.error(`Failed to retrieve key "${key}" from Redis:`, error)
		throw error
	}
}

/**
 * Stores server data for a specific user.
 * @param {string | undefined} userId - The user ID to associate with the server data.
 * @param {object | Array<object>} servers - The server data to store.
 * @returns {Promise<void>} A promise that resolves when the server data is stored.
 * @throws Will throw an error if storing server data fails.
 */
const setServer = async (
	userId: string | undefined,
	servers: object | Array<object>
): Promise<void> => {
	if (!userId) {
		console.warn('No user ID provided to setServer')
		return
	}

	try {
		await redis.set(userId, JSON.stringify(servers))
	} catch (error) {
		console.error(`Failed to set servers for user "${userId}":`, error)
		throw error
	}
}

/**
 * Retrieves server data for the authenticated user.
 * @returns {Promise<DiscordGuild[] | null>} An array of server data, or null if no data is found.
 * @throws Will throw an error if retrieving server data fails.
 */
const getServer = async (): Promise<DiscordGuild[] | null> => {
	const authToken = await getAuthTokenOrNull()

	if (!authToken) {
		console.warn('No authentication token found')
		return null
	}

	const { id } = authToken.payload

	try {
		const data = (await redis.get(id)) as DiscordGuild[]
		return data
	} catch (error) {
		console.error(`Failed to retrieve servers for user "${id}":`, error)
		throw error
	}
}

export { add, get, setServer, getServer }
