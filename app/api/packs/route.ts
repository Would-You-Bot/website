import { PackData, PackType } from '@/app/packs/create/_components/PackForm'
import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'
import validator from 'validator'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const PAGE_NUMBER = parseInt(validator.escape(searchParams.get('page') || '1'))
  const TYPE = validator.escape(searchParams.get('type') || '')
  const PACK_ID =  validator.escape(searchParams.get('id') || '')

  const PAGE_SIZE = 15

  const skip = (PAGE_NUMBER - 1) * PAGE_SIZE

  const where = {
    pending: false,
    ...(TYPE && ['wouldyourather', 'neverhaveiever', 'whatwouldyoudo', 'truth', 'dare', 'topic', 'mixed'].includes(TYPE) && { type: TYPE as PackType }),
    ...(PACK_ID && { id: PACK_ID })
  };

  const questionsPromise = prisma.questionPack
  .findMany({
    where,
    select: {
      type: true,
      id: true,
      featured: true,
      name: true,
      description: true,
      tags: true,
      likes: true,
      questions: true
    },
    skip,
    take: PAGE_SIZE
  })

    const totalPagePromise = prisma.questionPack.count({
      where: {
        pending: false
      }
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
      likes: question.likes.length,
      questions: question.questions.length
    }))

  return NextResponse.json(
    { data: questionsWithCounts, totalPages: Math.floor(totalPage / PAGE_SIZE) === 0 ? 1 : Math.floor(totalPage / PAGE_SIZE) },
    { status: 200 }
  )
}

export async function POST(request: NextRequest) {
  const data: PackData = await request.json()

  const { packSchema } = await import('@/utils/zod/schemas')

  const parsedPackResult = packSchema.safeParse(data)

  if (!parsedPackResult.success) {
    return NextResponse.json(
      { message: parsedPackResult.error.issues },
      { status: 400 }
    )
  }

  const tokenData = await getAuthTokenOrNull()

  type Questions = {
      id: string
      question: string
      type: Exclude<PackType, 'mixed'>
  }

  const {
    type,
    name,
    description,
    tags,
    questions: preProcessedQuestions
  } = data

  const questions: Questions[] = []

  for (const question of preProcessedQuestions) {
    questions.push({
        id: uuidv4(),
        type: type === 'mixed' ? question.type : type,
        question: question.question
    })
  }

  if (!tokenData?.payload.id) {
    return NextResponse.json(
      { message: 'You need to be logged in to create a pack!' },
      { status: 401 }
    )
  }

  const newPack = await prisma.questionPack
    .create({
      data: {
        authorId: tokenData?.payload.id,
        type,
        name,
        description,
        tags,
        featured: false,
        likes: [`${tokenData?.payload.id}`],
        questions,
        pending: false
      }
    })
    .catch((err: Error) => {
      return NextResponse.json(
        {
          message:
            'Error creating a database entry for the pack, please contact the support!',
          error: err.message
        },
        { status: 500 }
      )
    })
   
    // @ts-ignore If the pack creation fails, return a 500 status code
    if(newPack.status === 500) {
      return NextResponse.json(
        { message: 'Error creating a database entry for the pack, please contact the support!' },
        { status: 500 }
      )
    }

  return NextResponse.json(
    { message: 'New pack creation successfully!', data: newPack },
    { status: 200 }
  )
}

export const maxDuration = 10
