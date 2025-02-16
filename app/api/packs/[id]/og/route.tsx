/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
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

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const id = validator.escape(params.id)

  const packData = await prisma.questionPack.findFirst({
    where: { id: id },
    select: {
      name: true,
      description: true,
      authorId: true,
      likes: true,
    }
  })

  console.log(packData)

  if (!packData) {
    return new ImageResponse(
      <div style={{
        display: 'flex',
        background: '#040A0F',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 120
      }}>
        404
      </div>,
      { width: 1200, height: 630 }
    )
  }

  const authorData = await prisma.user.findFirst({
    where: { userID: packData.authorId },
    select: { globalName: true, avatarUrl: true, profilePrivacy: true }
  })

  console.log(authorData)

  if (!authorData) {
    return new ImageResponse(
      <div style={{
        display: 'flex',
        background: '#040A0F',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 120
      }}>
        404
      </div>,
      { width: 1200, height: 630 }
    )
  }

  if (authorData.profilePrivacy) {
    authorData.globalName = "Private"
    authorData.avatarUrl = "https://cdn.discordapp.com/embed/avatars/0.png"
  }

  return new ImageResponse(
		(
			<div
				style={{ fontFamily: 'Inter' }}
				tw="relative flex items-center justify-center w-full h-full"
			>
        {/* Background Image for the entire canvas */}
        <div
          tw="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(https://wouldyoubot.gg/Background.png)', // Local image reference
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        {/* Author Section */}
        <div tw="flex items-center bg-gray-800/80 px-4 py-2 rounded-lg">
          <img
            src={authorData?.avatarUrl!}
            alt="Author avatar"
            tw="w-8 h-8 rounded-full"
          />
          <span tw="text-gray-300 text-xl ml-3">{authorData?.globalName ?? "None"}</span>
        </div>

        {/* Content Section */}
        <div tw="flex flex-col gap-6 z-10">
          <h1 tw="text-6xl font-bold text-white">{packData.name}</h1>
          <p tw="text-3xl text-gray-400 max-w-2xl leading-snug">
            {packData.description}
          </p>
        </div>

        {/* Stats Section */}
        <div tw="flex gap-12 mt-auto z-10">
          <div tw="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 20 20" fill="#EF4444">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              />
            </svg>
            <span tw="text-white text-2xl">84 Likes</span>
          </div>

          <div tw="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 20 20" fill="#3B82F6">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span tw="text-white text-2xl">8383 Plays</span>
          </div>
        </div>

        {/* Logo */}
        <div tw="absolute bottom-16 right-16 w-20 h-20">
          <div tw="w-full h-full rounded-xl bg-gradient-to-r from-red-500 to-blue-500" />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: await loadGoogleFont('Inter'),
          style: 'normal'
        }
      ]
    }
  )
}