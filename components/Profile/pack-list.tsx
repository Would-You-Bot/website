'use client'

import QuestionPack from '@/app/packs/_components/QuestionPack'
import { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import { SearchX } from 'lucide-react'

export interface PackData {
	type: string
	id: string
	popular: boolean
	name: string
	language: string
	description: string
	tags: string[]
	likes: string
	questions: number
	status: 'pending' | 'approved' | 'resubmit_pending' | 'denied'
	userLiked: boolean
}

export interface PackResponse {
	data: PackData[]
	totalPages: number
}

interface PackListProps {
	type: 'likes' | 'created'
	id: string
	canEdit?: boolean
}

export function PackList({ type, id, canEdit }: PackListProps) {
	const [packs, setPacks] = useState<PackResponse['data']>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function getPack() {
			const res = await fetch(`/api/user/${id}/packs?type=${type}`)
			const packData: PackResponse = await res.json()
			setPacks(packData.data)
			setLoading(false)
		}
		getPack()
	}, [type, id])

	const sortedPacks = [...packs].sort((a, b) => {
		if (a.popular && !b.popular) return -1
		if (!a.popular && b.popular) return 1
		return 0
	})

	const groupedPacks = sortedPacks.reduce(
		(acc, pack) => {
			if (type === 'created') {
				if (pack.status === 'pending') {
					acc.pending.push(pack)
				} else if (pack.status === 'resubmit_pending') {
					acc.resubmitPending.push(pack)
				} else {
					acc.approved.push(pack)
				}
			} else {
				acc.all.push(pack)
			}
			return acc
		},
		{ all: [], approved: [], resubmitPending: [], pending: [] } as Record<
			string,
			PackResponse['data']
		>
	)

	const renderPacks = (
		packs: PackResponse['data'],
		style: 'default' | 'created' | 'pending' | 'denied' | 'resubmit_pending'
	) => (
		<>
			{packs.length > 0 ?
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					{packs.map((pack) => (
						<QuestionPack
							key={pack.id}
							userId={id}
							type={pack.type}
							id={pack.id}
							popular={pack.popular}
							name={pack.name}
							description={pack.description}
							likes={String(pack.likes)}
							userLiked={pack.userLiked}
							questions={pack.questions}
							style={style} // TODO: fix
							language={pack.language}
							tags={pack.tags}
							canEdit={canEdit}
							isLoggedIn={true}
						/>
					))}
				</div>
			:	<EmptyList />}
		</>
	)

	if (loading)
		return (
			<ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
				{Array.from({ length: 4 }).map((_, index) => (
					<Skeleton
						key={`loader-${index * 2}`}
						className="h-[256px] bg-foreground/15"
					/>
				))}
			</ul>
		)

	return (
		<div className="space-y-4">
			{type === 'likes' && (
				<>
					<h2 className="text-xl font-semibold mt-8 mb-4">Liked Packs</h2>
					{renderPacks(groupedPacks.all, 'default')}
				</>
			)}

			{type === 'created' && (
				<>
					{groupedPacks.approved.length > 0 && (
						<>
							<h2 className="text-xl font-semibold mt-8 mb-4">Created Packs</h2>
							{renderPacks(groupedPacks.approved, 'created')}
						</>
					)}
					{groupedPacks.resubmitPending.length > 0 && (
						<>
							<h2 className="text-xl font-semibold mt-8 mb-4">
								Resubmit Pending Packs
							</h2>
							{renderPacks(groupedPacks.resubmitPending, 'resubmit_pending')}
						</>
					)}
					{groupedPacks.pending.length > 0 && (
						<>
							<h2 className="text-xl font-semibold mt-8 mb-4">Pending Packs</h2>
							{renderPacks(groupedPacks.pending, 'pending')}
						</>
					)}
				</>
			)}
		</div>
	)
}

const EmptyList = () => (
	<div className="flex items-center justify-center h-[250px] lg:h-[400px] border rounded-md">
		<SearchX className="size-8 text-muted-foreground" />
		<p className="text-muted-foreground">Nothing to see here</p>
	</div>
)
