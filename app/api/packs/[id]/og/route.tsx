import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { prisma } from '@/lib/prisma'
import validator from 'validator'

async function loadGoogleFont(font: string) {
	const url = `https://fonts.googleapis.com/css2?family=${font}:opsz,wght@14..32,600..900&display=swap" rel="stylesheet`
	const css = await (await fetch(url)).text()
	const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

	if (resource) {
		const response = await fetch(resource[1])
		if (response.status == 200) {
			return await response.arrayBuffer()
		}
	}

	throw new Error('failed to load font data')
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
	const id = validator.escape((await params).id) // Sanitize ID

	const packData = await prisma.questionPack.findFirst({
		where: {
			id
		}, 
    select: { 
      id: true,
      name: true,
      authorId: true,
      likes: true
     }
	})

  if (!packData) {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            fontSize: 180,
            color: 'white',
            background: '#040A0F',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter',
            alignItems: 'center'
          }}
        >
          404
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    )
  }


  const author = await prisma.user.findFirst({
    where: {
      id: packData.authorId
    },
    select: {
      displayName: true,
      profilePrivacy: true,
    }
  })
  console.log(author)
    return new ImageResponse(
      (
        <div style={{fontFamily: 'Inter'}} tw="h-full w-full flex items-start justify-start bg-yellow-100 p-20">
          <div tw="flex h-full items-center w-full">
            <div tw="flex-1 flex flex-col mr-20">
              <p tw="font-bold mb-0">
                Likes {packData.likes} • Author {!author?.profilePrivacy ? author?.displayName : 'Unknown'}
              </p>
              <h1 tw="text-6xl">{packData.name}</h1>
              <p tw="text-red-500 text-lg mt-0">
                Sussy • 5min
              </p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 627,
        fonts: [
          {
            name: 'Inter',
            data: await loadGoogleFont('Inter'),
            style: 'normal'
          }
        ]
      }
    );
}