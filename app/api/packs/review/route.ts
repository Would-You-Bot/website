import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

// Get all packs left to review
export async function GET() {
  const question = await prisma.questionPack
    .findFirst({
      where: {
        pending: true,
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
  return NextResponse.json({ message: 'Put Request' }, { status: 200 })
}
