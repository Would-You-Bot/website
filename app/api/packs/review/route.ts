import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { NextResponse, type NextRequest } from 'next/server'
import DiscordLogger from '@/lib/logger'
import { Status } from '@prisma/client'
import { prisma } from '@/lib/prisma'

// Get all packs left to review
export async function GET() {
	const question = await prisma.questionPack
		.findMany({
			where: {
				status: Status.pending
			},
			orderBy: {
				updatedAt: 'asc'
			},
			select: {
				status: true,
				type: true,
				id: true,
				name: true,
				description: true,
				tags: true,
				questions: true,
				language: true
			}
		})
		.catch(() => {
			return NextResponse.json(
				{ message: 'Error fetching questions!' },
				{ status: 500 }
			)
		})

	if (!question) {
		return NextResponse.json(
			{ message: 'No more questions left to review' },
			{ status: 404 }
		)
	}

	return NextResponse.json({ data: question }, { status: 200 })
}
export async function PUT(request: NextRequest) {
	const tokenData = await getAuthTokenOrNull()
	const actionBy = tokenData?.payload.id ?? '0'

	const { reviewQuestionSchema } = await import('@/utils/zod/reviewSchemas')
	const body = await request.json()
	const parsedReviewResult = reviewQuestionSchema.safeParse(body)

	if (!parsedReviewResult.success) {
		return NextResponse.json(
			{ message: parsedReviewResult.error.issues },
			{ status: 400 }
		)
	}

	const { id, approved, message } = parsedReviewResult.data

	try {
		const updatedPack = await prisma.questionPack.update({
			where: {
				id: id
			},
			data: {
				status: approved ? Status.approved : Status.denied
			}
		})

		if (approved) {
			DiscordLogger.approvedQuestion(updatedPack, actionBy, message)
		} else {
			DiscordLogger.deniedQuestion(updatedPack, actionBy, message)
		}

		return NextResponse.json(
			{
				message:
					approved ? 'Pack approved successfully' : 'Pack denied successfully',
				data: updatedPack
			},
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error updating question pack' },
			{ status: 500 }
		)
	}
}
