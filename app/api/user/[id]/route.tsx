import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { NextResponse, type NextRequest } from 'next/server'
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
	const id = validator.escape((await params).id) // Sanitize ID
	const auth = await getAuthTokenOrNull(
		request.headers.get('Authorization') ?? undefined
	)
	const userId = auth?.payload?.id

	const userData = await prisma.user.findFirst({
		where: {
			userID: id
		}
	})

	if (!userData) {
		return NextResponse.json(
			{
				message: 'No user found!',
				data: {
					displayName: 'Private User',
					avatarUrl: '/Logo.png'
				}
			},
			{ status: 404 }
		)
	}

	// Enforce privacy: only the owner can access their profile if profilePrivacy is true
	if (userData.profilePrivacy && userId !== id) {
		return NextResponse.json(
			{
				message: 'No user found!',
				data: {
					displayName: 'Private User',
					avatarUrl: '/Logo.png'
				}
			},
			{ status: 404 }
		)
	}

	return NextResponse.json(
		{
			data: userData
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
	const id = validator.escape((await params).id) // Sanitize ID
	const auth = await getAuthTokenOrNull()
	const userId = auth?.payload?.id

	const userRequest = await request.json()

	// Move to middle ware at some point to avoid duplication
	if (!userId || userId !== id) {
		return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 })
	}

	const { userSchema } = await import('@/utils/zod/schemas')

	const parsedUserResult = userSchema.safeParse(userRequest)

	if (!parsedUserResult.success) {
		return NextResponse.json(
			{ message: parsedUserResult.error.issues },
			{ status: 400 }
		)
	}

	const updatedUserData = await prisma.user.update({
		where: {
			userID: userId
		},
		data: {
			description: userRequest.description,
			votePrivacy: userRequest.votePrivacy,
			profilePrivacy: userRequest.profilePrivacy,
			likedPackPrivacy: userRequest.likedPackPrivacy
		}
	})

	return NextResponse.json({ data: updatedUserData }, { status: 200 })
}

export const maxDuration = 7
