import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import DiscordLogger from '@/lib/logger'
import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'

// Get all packs left to review
export async function GET() {
	const question = await prisma.questionPack
		.findFirst({
			where: {
				pending: true
			},
			select: {
				denied: true,
				pending: true,
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

	// @ts-expect-error
	if (question?.status === 500) {
		return NextResponse.json(
			{ message: 'Error getting questions left to review, please fix!' },
			{ status: 500 }
		)
	}

	if (!question) {
		return NextResponse.json(
			{ message: 'No more questions left to review' },
			{ status: 404 }
		)
	}

	return NextResponse.json({ data: question }, { status: 200 })
}
// Review a pack should just be a boolean and an id
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

  const { id, approved } = parsedReviewResult.data

  try {
    const updatedPack = await prisma.questionPack.update({
      where: {
        id: id
      },
      data: {
        pending: false,
        denied: !approved
      }
    })

    if (approved) {
      DiscordLogger.approvedQuestion(updatedPack, actionBy)
    } else {
      DiscordLogger.deniedQuestion(updatedPack, actionBy)
    }

    return NextResponse.json(
      { 
        message: approved ? 'Pack approved successfully' : 'Pack denied successfully',
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
