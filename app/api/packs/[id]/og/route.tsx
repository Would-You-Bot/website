/* eslint-disable @next/next/no-img-element */
import getImageBase64 from '@/helpers/og/getImageBase64'
import loadGoogleFont from '@/helpers/og/loadGoogleFont'
import { ImageResponse } from 'next/og'
import { prisma } from '@/lib/prisma'
import validator from 'validator'

export async function GET(
	request: Request,
	props: { params: Promise<{ id: string }> }
) {
	const params = await props.params

	const id = validator.escape(params.id)

	let packData
	try {
		packData = await prisma.questionPack.findFirst({
			where: { id: id },
			select: {
				name: true,
				description: true,
				authorId: true,
				likes: true,
				type: true,
				nsfw: true,
				uses: true
			}
		})
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.stack)
		} else {
			console.log('Bad things happened')
		}
	}

	if (!packData) {
		return new ImageResponse(
			(
				<div
					style={{
						display: 'flex',
						background: '#040A0F',
						width: '100%',
						height: '100%',
						alignItems: 'center',
						justifyContent: 'center',
						color: 'white',
						fontSize: 120
					}}
				>
					404
				</div>
			),
			{ width: 1200, height: 630 }
		)
	}

	let authorData
	try {
		authorData = await prisma.user.findFirst({
			where: { userID: packData.authorId },
			select: { globalName: true, avatarUrl: true, profilePrivacy: true }
		})
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.stack)
		} else {
			console.log('Bad things happened')
		}
	}

	if (!authorData) {
		return new ImageResponse(
			(
				<div
					style={{
						display: 'flex',
						background: '#040A0F',
						width: '100%',
						height: '100%',
						alignItems: 'center',
						justifyContent: 'center',
						color: 'white',
						fontSize: 120
					}}
				>
					404
				</div>
			),
			{ width: 1200, height: 630 }
		)
	}

	const descriptionToShow =
		packData.description.length > 200 ?
			packData.description.slice(0, 200) + '...'
		:	packData.description

	if (authorData.profilePrivacy) {
		authorData.globalName = 'Private'
		authorData.avatarUrl = 'https://cdn.discordapp.com/embed/avatars/0.png'
	} else {
		const res = await getImageBase64(authorData.avatarUrl!)
		authorData.avatarUrl = res.url
	}

	return new ImageResponse(
		(
			<div
				style={{
					fontFamily: 'Inter',
					backgroundImage: 'url(https://wouldyoubot.gg/Background.png)', // Local image reference
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
				tw="relative flex flex-col items-center justify-center w-full h-full p-10"
			>
				<div tw="w-full flex flex-col mb-auto mt-24">
					<div tw="flex items-center justify-between">
						<div tw="flex items-center bg-gray-800/50 border border-gray-800 px-4 py-2 rounded-lg">
							<img
								src={authorData?.avatarUrl!}
								width={24}
								height={24}
								alt="Author avatar"
								tw="w-8 h-8 rounded-full"
							/>
							<span tw="text-gray-100 text-xl ml-3">
								{authorData?.globalName ?? 'None'}
							</span>
						</div>
						{/* just to keep the pill from taking up the whole space */}
						<div tw="flex flex-1"></div>
					</div>

					{/* Content Section */}
					<div tw="flex flex-col">
						<h1 tw="text-6xl font-bold text-white -mb-1">
							{packData.nsfw ? 'NSFW Question Pack' : packData.name}
						</h1>
						<p tw="text-2xl text-white max-w-2xl leading-snug">
							{packData.nsfw ?
								'This question pack includes NSFW questions.'
							:	descriptionToShow}
						</p>
					</div>
				</div>

				<div tw="relative flex items-center justify-between w-full">
					{/* Stats Section */}
					<div tw="flex">
						<div tw="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="26"
								height="26"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="#FFFFFF"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
								/>
							</svg>
							<span tw="text-white text-2xl ml-3">{packData.type}</span>
						</div>

						<div tw="flex items-center ml-10">
							<svg
								width="28"
								height="28"
								viewBox="0 0 20 20"
								fill="#EF4444"
							>
								<path
									fillRule="evenodd"
									d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
								/>
							</svg>
							<span tw="text-white text-2xl ml-3">
								{packData.likes.length ?? 0} Likes
							</span>
						</div>

						<div tw="flex items-center ml-10">
							<svg
								width="28"
								height="28"
								viewBox="0 0 20 20"
								fill="#3B82F6"
							>
								<path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
							</svg>
							<span tw="text-white text-2xl ml-3">
								{packData.uses ?? 0} Uses
							</span>
						</div>
					</div>
					{/* Logo */}
					<div tw="flex w-16 h-16 ml-auto">
						<img
							src="https://wouldyoubot.gg/Logo-Square.svg"
							alt="Logo"
							tw="w-full h-full rounded-md"
						/>
					</div>
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
