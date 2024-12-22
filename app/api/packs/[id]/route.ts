import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import validator from 'validator'

// Get all packs left to review we need request otherwise we can't get the params
export async function GET(
	request: NextRequest,
	{
		params
	}: {
		params: Promise<{ id: string }>
	}
) {
	const id = validator.escape((await params).id)
	const auth = await getAuthTokenOrNull()

	const question = await prisma.questionPack
		.findFirst({
			where: {
				id: id
			},
			select: {
				type: true,
				id: true,
				language: true,
				featured: true,
				name: true,
				description: true,
				tags: true,
				likes: true,
				questions: true,
				authorId: true
			}
		})
		.catch(() => {
			return NextResponse.json(
				{ message: 'Error fetching question!' },
				{ status: 500 }
			)
		})

	// @ts-expect-error
	if (question.status === 500) {
		return NextResponse.json(
			{ message: 'Error getting that question, please contact the support!' },
			{ status: 500 }
		)
	}

	if (!question) {
		return NextResponse.json(
			{ message: 'No question found with that id!' },
			{ status: 404 }
		)
	}
	// @ts-expect-error
	const isAuthor = question.authorId === auth?.payload.id
	const pending = isAuthor
	const denied = isAuthor

	return NextResponse.json(
		{
			data: question,
			pending,
			denied,
			// @ts-expect-error
			likes: question.likes.length,
			// @ts-expect-error
			userLiked: question.likes.includes(auth?.payload.id || '')
		},
		{ status: 200 }
	)
}

export async function PATCH(
	request: NextRequest,
	{
		params
	}: {
		params: Promise<{ id: string }>
	}
) {
	const id = validator.escape((await params).id)
	const auth = await getAuthTokenOrNull()
	const userId = auth?.payload?.id

	const pack = await prisma.questionPack.findFirst({
		where: {
			id: id
		},
		select: {
			id: true,
			name: true,
			authorId: true,
			description: true,
			tags: true,
			questions: true
		}
	})

	if (!pack) {
		return NextResponse.json(
			{ message: 'No question found with that id!' },
			{ status: 404 }
		)
	}

	if (pack.authorId !== userId) {
		return NextResponse.json(
			{ message: 'You are not the author of this question pack!' },
			{ status: 401 }
		)
	}

	const data = await request.json()

	const { editedPackSchema } = await import('@/utils/zod/schemas')

	const parsedPackResult = editedPackSchema.safeParse(data)

	if (!parsedPackResult.success) {
		return NextResponse.json(
			{ message: parsedPackResult.error.issues },
			{ status: 400 }
		)
	}

	const editPack = await prisma.questionPack.update({
		where: {
			id: pack.id
		},
		data: {
			name: data.name,
			description: data.description,
			tags: data.tags,
			questions: data.questions,
			pending: true
		}
	})

	if (!editPack) {
		return NextResponse.json(
			{ message: 'Error updating pack!' },
			{ status: 500 }
		)
	}

	return NextResponse.json(
		{ message: 'Your question pack was updated!' },
		{ status: 200 }
	)
}

export async function DELETE(
	request: NextRequest,
	{
		params
	}: {
		params: Promise<{ id: string }>
	}
) {
	const id = validator.escape((await params).id)
	const auth = await getAuthTokenOrNull()
	const userId = auth?.payload?.id

	const pack = await prisma.questionPack.findFirst({
		where: {
			id: id,
			pending: false,
			denied: false
		},
		select: {
			id: true,
			authorId: true
		}
	})

	if (!pack) {
		return NextResponse.json(
			{ message: 'No question found with that id!' },
			{ status: 404 }
		)
	}

	if (pack.authorId !== userId) {
		return NextResponse.json(
			{ message: 'You are not the author of this question pack!' },
			{ status: 401 }
		)
	}

	await prisma.questionPack.delete({
		where: {
			id: pack.id
		}
	})

	return NextResponse.json(
		{ message: 'Your question pack was deleted!' },
		{ status: 200 }
	)
}
