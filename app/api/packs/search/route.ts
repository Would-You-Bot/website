import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { NextRequest, NextResponse } from 'next/server'
import { PackType, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const QuerySchema = z.object({
	page: z.string().default('1'),
	type: z.string().optional(),
	id: z.string().optional(),
	query: z.string().optional()
})

const PAGE_SIZE = 15

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)

	const queryResult = QuerySchema.safeParse(
		Object.fromEntries(searchParams.entries())
	)
	if (!queryResult.success) {
		return NextResponse.json(
			{
				message: 'Invalid query parameters',
				errors: queryResult.error.errors,
				success: false
			},
			{ status: 400 }
		)
	}

	const { page, type, id, query } = queryResult.data
	const pageNumber = Math.max(1, parseInt(page, 10))
	const skip = (pageNumber - 1) * PAGE_SIZE

	const where: Prisma.QuestionPackWhereInput = {
		pending: false,
		denied: false,
		AND: [
			(
				type &&
				[
					'wouldyourather',
					'neverhaveiever',
					'whatwouldyoudo',
					'truth',
					'dare',
					'topic',
					'mixed'
				].includes(type)
			) ?
				{ type: type as PackType }
			:	{},
			id ? { id } : {},
			query ?
				{
					OR: [
						{ name: { contains: query, mode: 'insensitive' } },
						{ description: { contains: query, mode: 'insensitive' } },
						{ tags: { has: query } }
					]
				}
			:	{}
		]
	}

	const select: Prisma.QuestionPackSelect = {
		type: true,
		id: true,
		featured: true,
		name: true,
		language: true,
		description: true,
		tags: true,
		likes: true,
		questions: true
	}

	const [packs, totalCount] = await Promise.all([
		prisma.questionPack.findMany({
			where,
			orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
			select,
			skip,
			take: PAGE_SIZE
		}),
		prisma.questionPack.count({ where })
	]).catch((error) => {
		console.error('Database query failed:', error)
		throw new Error('Failed to fetch question packs')
	})

	if (!packs.length) {
		return NextResponse.json(
			{
				message: 'No question packs found',
				success: false
			},
			{ status: 404 }
		)
	}

	const tokenData = await getAuthTokenOrNull(
		request.headers.get('Authorization') ?? undefined
	)
	const userId = tokenData?.payload.id

	const packsWithMetadata = packs.map((pack) => ({
		...pack,
		questionCount: pack.questions.length,
		likes: pack.likes.length,
		userLiked: userId ? pack.likes.includes(userId) : false,
		questions: pack.questions.length
	}))

	return NextResponse.json(
		{
			data: packsWithMetadata,
			totalPages:
				Math.floor(totalCount / PAGE_SIZE) === 0 ?
					1
				:	Math.floor(totalCount / PAGE_SIZE),
			success: true
		},
		{ status: 200 }
	)
}
