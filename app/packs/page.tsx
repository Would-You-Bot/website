import Container from '@/components/Container'

import QuestionPackList from './_components/QuestionPackList'
import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import PacksPagination from './_components/PacksPagination'
import Filter from './_components/Filter'
import { PackType } from '@prisma/client'
import { Metadata, Viewport } from 'next'
import { Smile } from 'lucide-react'

export const metadata: Metadata = {
	metadataBase: new URL('https://wouldyoubot.gg'),
	alternates: {
		canonical: '/'
	},
	title: 'Question Packs - Would You',
	description:
		'Explore a huge list of custom questions including would you rather, truth or dare, never have I ever, and many more!',
	twitter: {
		title: 'Question Packs - Would You',
		card: 'summary_large_image',
		images: '/question-packs.png',
		description:
			'Explore a huge list of custom questions including would you rather, truth or dare, never have I ever, and many more!'
	},
	openGraph: {
		title: 'Question Packs - Would You',
		images: '/question-packs.png',
		description:
			'Explore a huge list of custom questions including would you rather, truth or dare, never have I ever, and many more!'
	},
	robots: {
		index: true,
		follow: true
	}
}

export const viewport: Viewport = {
	maximumScale: 5,
	themeColor: '#0598F6'
}

export const dynamic = 'force-dynamic'

export interface PackResponse {
	data: {
		type: PackType
		id: string
		popular: boolean
		name: string
		language: string
		description: string
		tags: string[]
		likes: string
		userLiked: boolean
		questions: number
	}[]
	totalPages: number
	success: boolean
}

const getQuestionPacks = async (page: string, type: string, query: string) => {
	const token = await getAuthTokenOrNull()
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/packs/search?page=${page}&type=${type}&query=${query}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token?.value ?? 'should not be here'
			},
			next: { revalidate: 5 }
		}
	)
	const resData: PackResponse = await res.json()
	return resData
}

async function page({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const type = searchParams.type ? (searchParams.type as string) : 'all'
	const page = searchParams.page ? (searchParams.page as string) : '1'
	const query = searchParams.query ? (searchParams.query as string) : ''

	const auth = await getAuthTokenOrNull()
	const userId = auth?.payload?.id || null

	const responseData = await getQuestionPacks(page, type, query)

	return (
		<Container className="pt-8 lg:pt-10 space-y-8 min-h-[calc(100vh-112px)]">
			<h1 className="text-4xl font-bold">
				<span className="text-brand-red-100 drop-shadow-red-glow">
					Question
				</span>{' '}
				<span className="text-brand-blue-100 drop-shadow-blue-glow">Packs</span>
			</h1>
			<div className="space-y-10 lg:space-y-14 mb-10">
				<Filter />
				{responseData.success && responseData.data.length > 0 ?
					<section className="min-h-96">
						<QuestionPackList
							packList={responseData.data}
							userId={userId}
							isLoggedIn={!!auth}
						/>
					</section>
				:	<section className="min-h-96 grid place-content-center">
						<div className="flex flex-col text-muted-foreground items-center gap-4">
							<Smile size={56} />
							<p>Nothing to show here yet please check back later</p>
						</div>
					</section>
				}
				{responseData.totalPages > 1 && (
					<PacksPagination totalPages={responseData.totalPages} />
				)}
			</div>
		</Container>
	)
}

export default page
