import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import validator from 'validator'
import { Status } from '@prisma/client'

export async function PUT(
	request: NextRequest,
	{
		params
	}: {
		params: Promise<{ id: string }>
	}
) {
	const id = validator.escape((await params).id)
	const auth = await getAuthTokenOrNull()
	if (!auth?.payload.id)
		return NextResponse.json(
			{ message: 'You must be logged in to like a question pack!' },
			{ status: 401 }
		)
	const userId = auth.payload.id

	const questionLikes = await prisma.questionPack.findFirst({
		where: {
			id: id,
			status: { notIn: [Status.pending, Status.resubmit_pending] }
		},
		select: {
			likes: true
		}
	})

	if (!questionLikes) {
		return NextResponse.json(
			{ message: 'No question found with that id!' },
			{ status: 404 }
		)
	}

	if (questionLikes.likes.includes(userId)) {
		const removeLike = await prisma.questionPack.update({
			where: { id },
			data: {
				likes: {
					set: questionLikes.likes.filter((like) => like !== userId)
				}
			}
		})
		if (removeLike.likes) {
			return NextResponse.json(
				{ likes: removeLike.likes.length, userLiked: false },
				{ status: 200 }
			)
		}
		return NextResponse.json(
			{ message: 'Error removing like' },
			{ status: 500 }
		)
	} else {
		const addLike = await prisma.questionPack.update({
			where: { id },
			data: {
				likes: {
					set: [...questionLikes.likes, userId]
				}
			}
		})
		if (addLike.likes) {
			return NextResponse.json(
				{ likes: addLike.likes.length, userLiked: true },
				{ status: 200 }
			)
		}
		return NextResponse.json({ message: 'Error adding like' }, { status: 500 })
	}
}
