'use client'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
import {
	ArrowLeft,
	CopyIcon,
	Edit,
	FileUp,
	Heart,
	LinkIcon
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ExportQuestionModal from '../_components/ExportQuestionModal'
import { Button } from '@/components/ui/button'
import Container from '@/components/Container'
import { PackData } from '@/utils/zod/schemas'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { PackResponse } from '@/types/Packs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import Link from 'next/link'
import axios from 'axios'
import clsx from 'clsx'

export default function Page({ params }: { params: { id: string } }) {
	const router = useRouter()
	const [packToShow, setPackToShow] = useState<PackResponse | null>(null)
	const [userData, setUserData] = useState({
		username: 'Private User',
		avatar: '/Logo.png',
		id: undefined
	})
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		async function getPack() {
			const res = await fetch(`/api/packs/${params.id}`)
			const packData = await res.json()

			// After getting the pack, fetch user data based on authorId
			if (packData.data.authorId) {
				const userRes = await fetch(`/api/user/${packData.data.authorId}`)
				if (userRes.ok) {
					const user = await userRes.json()

					setUserData({
						username: user.data.displayName,
						avatar: user.data.avatarUrl,
						id: user.data.id
					})
				}
			}
			// moved this down to avoid flashing private user before fetching user data
			setPackToShow(packData)
		}
		getPack()
	}, [params.id])

	const filteredQuestions =
		packToShow?.data.questions.filter((question) =>
			question.question.toLowerCase().includes(searchQuery.toLowerCase())
		) ?? []

	const toggleLike = async () => {
		try {
			const response = await axios.put(`/api/packs/${params.id}/likes`)

			const updatedLikes = response.data

			setPackToShow((prev) => {
				return {
					...prev,
					data: {
						...prev!.data,
						likes:
							updatedLikes.userLiked ?
								prev!.data.likes.filter((id) => id !== updatedLikes.id)
							:	[...prev!.data.likes, updatedLikes.id]
					},
					likes: updatedLikes.likes,
					userLiked: updatedLikes.userLiked
				} as PackResponse
			})
		} catch (error) {
			console.error('Error toggling like:', error)
		}
	}

	const copyShareLink = () => {
		navigator.clipboard.writeText(
			`${process.env.NEXT_PUBLIC_PAGE_URL}/packs/${params.id}`
		)
		toast.success('Copied to clipboard!')
	}

	const copyCommand = () => {
		navigator.clipboard.writeText(
			`/import ${packToShow?.data.type} ${params.id}`
		)
		toast.success('Copied to clipboard!')
	}

	return (
		<TooltipProvider delayDuration={0}>
			<Container>
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
					<div className="bg-card rounded-lg p-4 border space-y-4 lg:sticky lg:top-24 h-max @container">
						<div className="flex justify-between gap-4">
							<div className="flex gap-4 items-center">
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											onClick={() => router.push('/packs')}
											variant="ghost"
											size={'icon'}
										>
											<ArrowLeft className="size-4" />
											<span className="sr-only">Packs</span>
										</Button>
									</TooltipTrigger>
									<TooltipContent>Back to Packs</TooltipContent>
								</Tooltip>
								<h1 className="text-2xl text-brand-red-100 drop-shadow-red-glow">
									Details
								</h1>
							</div>
							<div className="flex gap-2">
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											onClick={toggleLike}
											variant="ghost"
											className="flex items-center gap-2"
										>
											<Heart
												className={clsx('size-4', {
													'text-destructive fill-destructive':
														packToShow?.userLiked
												})}
											/>
											<span
												className={clsx('', {
													'text-muted-foreground': !packToShow?.userLiked
												})}
											>
												{packToShow?.likes}
											</span>
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										{packToShow?.userLiked ? 'Unlike' : 'Like'} pack
									</TooltipContent>
								</Tooltip>

								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											onClick={copyShareLink}
											variant="ghost"
											size={'icon'}
										>
											<LinkIcon className="size-4" />
											<span className="sr-only">Share</span>
										</Button>
									</TooltipTrigger>
									<TooltipContent>Copy share link</TooltipContent>
								</Tooltip>
							</div>
						</div>

						<PackDetailsContainer>
							<PackDetailsHeader>Name</PackDetailsHeader>
							<PackDetailsText>{packToShow?.data.name}</PackDetailsText>
						</PackDetailsContainer>

						<PackDetailsContainer>
							<PackDetailsHeader>Description</PackDetailsHeader>
							<PackDetailsText>{packToShow?.data.description}</PackDetailsText>
						</PackDetailsContainer>

						<PackDetailsContainer>
							<PackDetailsHeader>Type</PackDetailsHeader>
							<p className="font-light">{packToShow?.data.type}</p>
						</PackDetailsContainer>

						<PackDetailsContainer>
							<PackDetailsHeader>Language</PackDetailsHeader>
							<p className="font-light">{packToShow?.data.language}</p>
						</PackDetailsContainer>

						<PackDetailsContainer>
							<PackDetailsHeader>Use Pack</PackDetailsHeader>
							<Tooltip>
								<TooltipTrigger asChild>
									<div
										className="w-full relative cursor-pointer group"
										onClick={copyCommand}
									>
										<Input
											id="command"
											defaultValue={`/import ${packToShow?.data.type} ${params.id}`}
											readOnly
											className="group-hover:bg-brand-blue-100/10 group-hover:text-brand-blue-100 focus:bg-brand-blue-100/10 focus:text-brand-blue-100 pr-10 text-sm text-muted-foreground cursor-pointer"
										/>
										<p className="p-2 h-fit text-brand-blue-100 absolute right-2 top-1">
											<span className="sr-only">Copy command</span>
											<CopyIcon className="h-4 w-4" />
										</p>
									</div>
								</TooltipTrigger>
								<TooltipContent>Copy Command</TooltipContent>
							</Tooltip>
						</PackDetailsContainer>

						<PackDetailsContainer>
							<PackDetailsHeader>Author</PackDetailsHeader>
							{userData.id == undefined}
							<Link
								href={
									userData.id === undefined ? '' : `/profile/${userData.id}`
								}
								className="flex items-center gap-1"
							>
								<Avatar className="w-6 h-6">
									<AvatarImage
										alt={userData.username + "'s avatar"}
										src={userData.avatar}
									/>
									<AvatarFallback>
										<Image
											src="/Logo.png'"
											alt="Fallback Avatar"
											width={40}
											height={40}
										/>
									</AvatarFallback>
								</Avatar>
								<p className="capitalize text-sm">{userData.username}</p>
							</Link>
						</PackDetailsContainer>

						<PackDetailsContainer>
							<PackDetailsHeader>Tags</PackDetailsHeader>
							{packToShow?.data.tags.map((tag) => (
								<Badge
									key={tag}
									className="pointer-events-none"
									variant={'secondary'}
								>
									{tag}
								</Badge>
							))}
						</PackDetailsContainer>
					</div>

					<div className="bg-card rounded-lg p-4 border lg:col-span-3">
						<div className="flex flex-row justify-between">
							<h2 className="text-2xl text-brand-blue-100 drop-shadow-blue-glow">
								Questions
							</h2>
							<div>
								<Tooltip>
									<TooltipTrigger>
										<ExportQuestionModal
											trigger={
												<Button
													variant="ghost"
													size="icon"
												>
													<FileUp className="size-4" />
													<span className="sr-only">Export Questions</span>
												</Button>
											}
											questions={packToShow?.data.questions!}
										/>
									</TooltipTrigger>
									<TooltipContent>Export Questions</TooltipContent>
								</Tooltip>
							</div>
						</div>

						<div>
							{packToShow?.data.questions.map((question, index) => (
								<div
									key={question.id}
									className={clsx('py-2 rounded-none', {
										'border-b': index !== packToShow?.data.questions.length - 1
									})}
								>
									<p className="break-words">{question.question}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</TooltipProvider>
	)
}

function PackDetailsContainer({ children }: { children: React.ReactNode }) {
	return <div className="space-y-1">{children}</div>
}

function PackDetailsHeader({ children }: { children: React.ReactNode }) {
	return <h2 className="font-bold text-foreground/70">{children}</h2>
}

function PackDetailsText({ children }: { children: React.ReactNode }) {
	return <p className="font-light">{children}</p>
}
