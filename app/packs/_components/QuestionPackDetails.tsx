'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
import {
	CopyIcon,
	ExternalLink,
	Eye,
	FileUp,
	Search,
	XIcon
} from 'lucide-react'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import ExportQuestionModal from './ExportQuestionModal'
import { Skeleton } from '@/components/ui/skeleton'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { PackData } from '@/utils/zod/schemas'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { PackType } from '@prisma/client'
import { packMap } from '@/types'
import Image from 'next/image'
import { toast } from 'sonner'

const PackDetails = ({ id, type }: { id: string; type: string }) => {
	const [packToShow, setPackToShow] = useState<PackData | null>(null)
	const [userData, setUserData] = useState({
		username: 'Private User',
		avatar: '/Logo.png'
	})
	const [searchQuery, setSearchQuery] = useState('')
	const [collapsedTypes, setCollapsedTypes] = useState<{
		[key: string]: boolean
	}>({})

	const toggleTypeCollapse = (type: PackType) => {
		setCollapsedTypes((prev) => ({
			...prev,
			[type]: !prev[type]
		}))
	}

	useEffect(() => {
		async function getPack() {
			const res = await fetch(`/api/packs/${id}`)
			const packData = await res.json()

			// After getting the pack, fetch user data based on authorId
			if (packData.data.authorId) {
				const userRes = await fetch(`/api/user/${packData.data.authorId}`)
				if (userRes.ok) {
					const user = await userRes.json()

					setUserData({
						username: user.data.displayName,
						avatar: user.data.avatarUrl
					})
				}
			}
			// moved this down to avoid flashing private user before fetching user data
			setPackToShow(packData.data)
		}
		getPack()
	}, [id])

	const filteredQuestions =
		packToShow?.questions.filter((question) =>
			question.question.toLowerCase().includes(searchQuery.toLowerCase())
		) ?? []

	interface QuestionGroups {
		[key: string]: Array<(typeof filteredQuestions)[0]>
	}

	const isMixedPack = packToShow?.type === 'mixed'

	const questionsByType =
		isMixedPack ?
			filteredQuestions.reduce<QuestionGroups>((groups, question) => {
				const type = question.type
				if (!groups[type]) {
					groups[type] = []
				}
				groups[type].push(question)
				return groups
			}, {})
		:	{}

	const sortedTypes: PackType[] =
		isMixedPack ? (Object.keys(questionsByType).sort() as PackType[]) : []

	const copyCommand = () => {
		navigator.clipboard.writeText(`/import ${id}`)
		toast.success('Copied to clipboard!')
	}

	if (!packToShow) return <QuestionPackDetailsSkeleton />

	return (
		<>
			<DialogHeader>
				<DialogTitle>{packToShow.name}</DialogTitle>
				<DialogDescription>{packToShow.description}</DialogDescription>
			</DialogHeader>

			<section className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 my-8 lg:my-4">
				<div className="flex flex-col gap-1">
					<h3 className="text-muted-foreground text-sm">Author</h3>
					<div className="flex items-center gap-1">
						<Avatar className="h-[32px] w-[32px]">
							<AvatarImage
								className="rounded-full"
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
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<h3 className="text-sm text-muted-foreground">Questions</h3>
					<p className="text-sm">{packToShow.questions.length}</p>
				</div>
				<div className="flex flex-col gap-1">
					<h3 className="text-sm text-muted-foreground">Type</h3>
					<p className="text-sm">{packMap[packToShow.type]}</p>
				</div>
			</section>

			<section className="grid flex-1 gap-2 my-1">
				<label className="text-sm capitalize">use the pack</label>
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger asChild>
							<div
								className="w-full relative cursor-pointer group"
								onClick={copyCommand}
							>
								<Input
									id="command"
									defaultValue={`/import ${id}`}
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
				</TooltipProvider>
			</section>

			<section className="max-md:mt-6">
				<p className="my-2 text-sm capitalize">look inside</p>
				<div className="border rounded-xl overflow-hidden">
					<div className="bg-background-darker flex items-center justify-between px-4 py-2 gap-4 border-b">
						<div className="relative w-full md:w-3/4">
							<Search className="size-4 absolute left-2 bottom-3 text-muted-foreground" />
							<Input
								placeholder="Search questions"
								className="w-full pl-8 focus:ring-0"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<TooltipProvider delayDuration={0}>
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
										questions={packToShow?.questions}
									/>
								</TooltipTrigger>
								<TooltipContent>Export Questions</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					{/*  */}
					{filteredQuestions.length > 0 ?
						isMixedPack ?
							// Grouped view for mixed packs
							<ul className="max-h-[100px] md:max-h-[200px] overflow-y-auto thin-scrollbar">
								{sortedTypes.map((type: PackType) => {
									const questionCount = questionsByType[type].length
									const isCollapsed = collapsedTypes[type] || false

									return (
										<li
											key={type}
											className="border-b last:border-b-0"
										>
											{/* Type header - clickable to collapse */}
											<div
												className="px-4 py-2 bg-muted/30 font-medium text-sm flex justify-between items-center cursor-pointer hover:bg-muted/50 transition-colors"
												onClick={() => toggleTypeCollapse(type)}
											>
												<div className="flex items-center space-x-2">
													<span>{isCollapsed ? '▶' : '▼'}</span>
													<span className="capitalize">{packMap[type]}</span>
													<span className="text-xs text-muted-foreground ml-2">
														({questionCount})
													</span>
												</div>
											</div>

											{/* Questions of this type - collapsible */}
											{!isCollapsed && (
												<ul className="divide-y border-t border-muted/20">
													{questionsByType[type].map((question, index) => (
														<li
															key={`${question.question}-${index}`}
															className="px-6 py-2 bg-background hover:bg-muted/10 transition-colors"
														>
															<p className="text-sm overflow-wrap-anywhere">
																{question.question}
															</p>
														</li>
													))}
												</ul>
											)}
										</li>
									)
								})}
							</ul>
							// Regular view for non-mixed packs
						:	<ul className="divide-y max-h-[100px] md:max-h-[200px] overflow-y-auto thin-scrollbar">
								{filteredQuestions.map((question, index) => (
									<li
										key={`${question.question}-${index}`}
										className="px-4 py-2"
									>
										<p className="text-sm overflow-wrap-anywhere">
											{question.question}
										</p>
									</li>
								))}
							</ul>

					:	<div className="px-4 py-8 text-center">
							<p className="text-muted-foreground text-sm mb-2">
								No questions found
							</p>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setSearchQuery('')}
								className="gap-2"
							>
								<XIcon className="h-4 w-4" />
								Clear search
							</Button>
						</div>
					}
				</div>
			</section>
		</>
	)
}

export function QuestionPackDetails({
	id,
	type,
	isReview = false
}: {
	id: string
	type: string
	isReview?: boolean
}) {
	const [isOpen, setIsOpen] = useState(false)
	const isMobile = useIsMobile()

	const buttonContent = (
		<Button
			className="w-full"
			variant={isReview ? 'outline' : 'default'}
		>
			{isReview ?
				<>
					<Eye className="mr-2 h-4 w-4 shrink-0" />
					<span>View Pack</span>
				</>
			:	<>
					<ExternalLink className="mr-2 h-4 w-4 shrink-0" />
					<span>Use Pack</span>
				</>
			}
		</Button>
	)

	if (isMobile) {
		return (
			<Drawer
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<DrawerTrigger asChild>{buttonContent}</DrawerTrigger>
				<DrawerContent>
					<div className="p-4">
						{isOpen && (
							<PackDetails
								id={id}
								type={type}
							/>
						)}
					</div>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogTrigger asChild>{buttonContent}</DialogTrigger>
			<DialogContent className="max-w-[90%] sm:max-w-lg lg:max-w-2xl">
				{isOpen && (
					<PackDetails
						id={id}
						type={type}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}

const QuestionPackDetailsSkeleton = () => {
	return (
		<>
			<DialogHeader>
				<DialogTitle>
					<Skeleton className="w-52 h-6 bg-foreground/15" />
				</DialogTitle>
				<DialogDescription>
					<Skeleton className="w-48 h-4 bg-foreground/15" />
				</DialogDescription>
			</DialogHeader>

			<section className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 my-2 lg:my-4">
				<div className="flex flex-col gap-1">
					<Skeleton className="w-16 h-4 bg-foreground/15" />
					<div className="flex items-center gap-1">
						<Skeleton className="size-8 rounded-full bg-foreground/15" />
						<Skeleton className="w-16 h-4 bg-foreground/15" />
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<Skeleton className="w-16 h-4 bg-foreground/15" />
					<Skeleton className="w-24 h-4 bg-foreground/15 mt-2" />
				</div>
				<div className="flex flex-col gap-1">
					<Skeleton className="w-16 h-4 bg-foreground/15" />
					<Skeleton className="w-24 h-4 bg-foreground/15 mt-2" />
				</div>
			</section>

			<section className="flex flex-col gap-4">
				<Skeleton className="w-32 h-4 bg-foreground/15" />
				<div className="p-3 rounded-lg border flex justify-between items-center gap-6">
					<Skeleton className="w-96 h-4 bg-foreground/15" />
					<Skeleton className="size-4 bg-foreground/15" />
				</div>
			</section>

			<section>
				<Skeleton className="w-32 h-4 bg-foreground/15 my-2" />
				<div className="border rounded-xl overflow-hidden">
					<div className="bg-background-darker flex items-center px-4 py-2 gap-4 border-b">
						<div className="relative md:w-3/4">
							<div className="p-3 rounded-lg border">
								<Search className="size-4 absolute left-2 bottom-3 text-muted-foreground" />
								<Skeleton className="w-24 h-4 bg-foreground/15 ml-4" />
							</div>
						</div>
					</div>
					<ul className="divide-y max-h-[100px] md:max-h-[200px] overflow-y-auto thin-scrollbar">
						{Array.from({ length: 3 }).map((_, index) => (
							<li
								key={index}
								className="px-4 py-2"
							>
								<Skeleton className="w-52 h-4 bg-foreground/15" />
							</li>
						))}
					</ul>
				</div>
			</section>
		</>
	)
}
