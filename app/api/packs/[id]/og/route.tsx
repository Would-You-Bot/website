/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import { prisma } from '@/lib/prisma'
import validator from 'validator'
import loadGoogleFont from '@/helpers/og/loadGoogleFont';

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
  } else {
    const getImageBase64 = (await import('@/helpers/og/getImageBase64')).default;
    const res = await getImageBase64(authorData.avatarUrl!)
    authorData.avatarUrl = res.url
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
            width={24}
            height={24}
            alt="Author avatar"
            tw="w-8 h-8 rounded-full"
          />
          <span tw="text-gray-300 text-xl ml-3">{authorData?.globalName ?? "None"}</span>
        </div>

        {/* Content Section */}
        <div tw="flex flex-col gap-6">
          <h1 tw="text-6xl font-bold text-white">{packData.name}</h1>
          <p tw="text-3xl text-gray-400 max-w-2xl leading-snug">
            {packData.description}
          </p>
        </div>

        {/* Stats Section */}
        <div tw="flex gap-12 mt-auto">
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
        <div tw="absolute flex bottom-16 right-16 w-20 h-20">
          <span tw="w-full h-full rounded-xl bg-gradient-to-r from-red-500 to-blue-500"></span>
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