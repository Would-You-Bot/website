import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { NextResponse, type NextRequest } from 'next/server'
import { Status } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import validator from 'validator'

export async function GET(
	request: NextRequest,
	{
		params
	}: {
		params: Promise<{ id: string }>
	}
) {
	const { searchParams } = new URL(request.url)

	const type = validator.escape(searchParams.get('type') || 'created')
	const id = validator.escape((await params).id)

	const auth = await getAuthTokenOrNull()
	const userId = auth?.payload?.id

	const PAGE_SIZE = 15
	const PAGE_NUMBER = parseInt(
		validator.escape(searchParams.get('page') || '1')
	)

	const skip = (PAGE_NUMBER - 1) * PAGE_SIZE

	const userData = await prisma.user.findFirst({
		where: {
			userID: id
		},
		select: {
			userID: true,
			profilePrivacy: true,
			likedPackPrivacy: true
		}
	})

	if (!userData || (userData.profilePrivacy && userData.userID !== userId)) {
		return NextResponse.json({ message: 'User not found!' }, { status: 404 })
	}

	if (
		type === 'likes' &&
		userData.likedPackPrivacy &&
		userData.userID !== userId
	) {
		return NextResponse.json(
			{ message: 'Liked packs are private!' },
			{ status: 403 }
		)
	}

	const where = {
		...(userData.userID !== userId && {
			status: { notIn: [Status.pending, Status.resubmit_pending] }
		}),
		...(type === 'created' && { authorId: userData.userID }),
		...(type === 'likes' && {
			likes: { has: id },
			status: { notIn: [Status.pending, Status.resubmit_pending] }
		})
	}

	const questionsPromise = prisma.questionPack.findMany({
		where,
		select: {
			type: true,
			id: true,
			name: true,
			language: true,
			description: true,
			tags: true,
			likes: true,
			questions: true,
			status: true
		},
		skip,
		take: PAGE_SIZE
	})

	const totalPagePromise = prisma.questionPack.count({
		where
	})

	const [questions, totalPage] = await Promise.all([
		questionsPromise,
		totalPagePromise
	])

	if (!questions) {
		return NextResponse.json(
			{ message: 'No questions found!' },
			{ status: 404 }
		)
	}

	const questionsWithCounts = questions.map((question) => ({
		...question,
		questions: question.questions.length,
		likes: question.likes.length,
		popular: false,
		userLiked: question.likes.includes(userId || '')
	}))

	return NextResponse.json(
		{
			data: questionsWithCounts,
			totalPages:
				Math.floor(totalPage / PAGE_SIZE) === 0 ?
					1
				:	Math.floor(totalPage / PAGE_SIZE)
		},
		{ status: 200 }
	)
}
