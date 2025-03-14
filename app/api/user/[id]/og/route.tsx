/* eslint-disable @next/next/no-img-element */
import loadGoogleFont from '@/helpers/og/loadGoogleFont'
import getImageBase64 from '@/helpers/og/getImageBase64'
import { ImageResponse } from 'next/og'
import { prisma } from '@/lib/prisma'
import validator from 'validator'

export async function GET(
	request: Request,
	props: { params: Promise<{ id: string }> }
) {
	const params = await props.params

	const id = validator.escape(params.id) // Sanitize ID

	const userData = await prisma.user.findFirst({
		where: {
			userID: id
		}
	})

	if (!userData || userData.profilePrivacy) {
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

	return new ImageResponse(
		(
			<div
				style={{ fontFamily: 'Inter' }}
				tw="relative flex items-center justify-center w-full h-full"
			>
				{/* Background Image for the entire canvas */}
				<div
					tw="absolute inset-0 w-full h-full z-0"
					style={{
						backgroundImage: 'url(https://wouldyoubot.gg/Background.png)', // Local image reference
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}
				></div>

				{/* Flex Container with Border */}
				<div tw="flex flex-col items-center justify-center w-[45%] max-w-[800px] p-8 ">
					{/* Profile Picture */}
					<img
						src={(await getImageBase64(userData.avatarUrl!)).url}
						alt={`${userData.displayName}'s profile`}
						width={150}
						height={150}
						tw="w-[150px] h-[150px] rounded-full border-4 border-[#0598F4] mb-6"
					/>

					{/* Text Content */}
					<h1 tw="text-white font-bold text-[60px] leading-tight text-center">
						{userData.displayName}
					</h1>
					<p tw="text-gray-50 font-semibold text-[24px] mt-4 text-center">
						{userData.description}
					</p>
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
