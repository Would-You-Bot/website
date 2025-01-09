import { NextResponse } from 'next/server'
import { getServer } from '@/lib/redis'

export async function GET() {
	try {
		const servers = await getServer()

		if (!servers) {
			return NextResponse.json(
				{ error: 'No servers found or user not authenticated' },
				{
					status: 404,
					headers: {
						'Cache-Control': 's-maxage=60, stale-while-revalidate=300'
					}
				}
			)
		}

		return NextResponse.json(servers, {
			status: 200,
			headers: {
				'Cache-Control': 's-maxage=60, stale-while-revalidate=300'
			}
		})
	} catch (error) {
		console.error('Error fetching servers:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch servers' },
			{
				status: 500,
				headers: {
					'Cache-Control': 'no-cache'
				}
			}
		)
	}
}
