'use client'

import ExportQuestionModal from '@/app/packs/_components/ExportQuestionModal'
import { ArrowLeft, CopyIcon, FileUp, Heart, LinkIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Container from '@/components/Container'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import clsx from 'clsx'

export function PackDetailsSkeleton() {
	return (
		<Container>
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
				<div className="bg-card rounded-lg p-4 border space-y-4 lg:sticky lg:top-24 h-max @container">
					<div className="flex flex-wrap justify-between gap-4">
						<div className="flex gap-4 items-center">
							<Button
								variant="ghost"
								size={'icon'}
							>
								<ArrowLeft className="size-4" />
								<span className="sr-only">Packs</span>
							</Button>
							<h1 className="text-2xl text-brand-red-100 drop-shadow-red-glow font-bold">
								Details
							</h1>
						</div>
						<div className="flex gap-2">
							<Button
								variant="ghost"
								className="flex items-center gap-2"
							>
								<Heart className="size-4" />
								<span className="opacity-0">n</span>
							</Button>
							<Button
								variant="ghost"
								size={'icon'}
							>
								<LinkIcon className="size-4" />
								<span className="sr-only">Share</span>
							</Button>
						</div>
					</div>

					<PackDetailsContainer>
						<PackDetailsHeader>Name</PackDetailsHeader>
						<PackDetailsText>
							<Skeleton className="h-4 w-16 rounded-md" />
						</PackDetailsText>
					</PackDetailsContainer>

					<PackDetailsContainer>
						<PackDetailsHeader>Description</PackDetailsHeader>
						<PackDetailsText>
							<Skeleton className="h-4 w-16 rounded-md" />
						</PackDetailsText>
					</PackDetailsContainer>

					<PackDetailsContainer>
						<PackDetailsHeader>Type</PackDetailsHeader>
						<span className="font-light">
							<Skeleton className="h-4 w-16 rounded-md" />
						</span>
					</PackDetailsContainer>

					<PackDetailsContainer>
						<PackDetailsHeader>Language</PackDetailsHeader>
						<span className="font-light">
							<Skeleton className="h-4 w-16 rounded-md" />
						</span>
					</PackDetailsContainer>

					<PackDetailsContainer>
						<PackDetailsHeader>Use Pack</PackDetailsHeader>

						<div className="w-full relative cursor-pointer group">
							<Input
								id="command"
								readOnly
								className="group-hover:bg-brand-blue-100/10 group-hover:text-brand-blue-100 focus:bg-brand-blue-100/10 focus:text-brand-blue-100 pr-10 text-sm text-muted-foreground cursor-pointer"
							/>
							<p className="p-2 h-fit text-brand-blue-100 absolute right-2 top-1">
								<span className="sr-only">Copy command</span>
								<CopyIcon className="h-4 w-4" />
							</p>
						</div>
					</PackDetailsContainer>
					<PackDetailsContainer>
						<PackDetailsHeader>Author</PackDetailsHeader>
						<div className="flex items-center gap-1">
							<Skeleton className="size-6 rounded-full" />
							<Skeleton className="h-4 w-16 rounded-md" />
						</div>
					</PackDetailsContainer>

					<PackDetailsContainer>
						<PackDetailsHeader>Tags</PackDetailsHeader>
						<div className="flex flex-wrap gap-1">
							<Badge
								className="pointer-events-none"
								variant={'secondary'}
							>
								<span className="opacity-0">lorem</span>
							</Badge>
							<Badge
								className="pointer-events-none"
								variant={'secondary'}
							>
								<span className="opacity-0">lorem</span>
							</Badge>
							<Badge
								className="pointer-events-none"
								variant={'secondary'}
							>
								<span className="opacity-0">lorem</span>
							</Badge>
						</div>
					</PackDetailsContainer>
				</div>

				<div className="bg-card rounded-lg p-4 border lg:col-span-3">
					<div className="flex flex-row justify-between">
						<h2 className="text-2xl text-brand-blue-100 drop-shadow-blue-glow font-bold">
							Questions
						</h2>
						<div>
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
								questions={[]}
							/>
						</div>
					</div>

					<div>
						{Array.from({ length: 10 }).map((_, index) => (
							<div
								key={index}
								className={clsx('py-2 rounded-none', {
									'border-b': index !== 4
								})}
							>
								<Skeleton className="h-4 w-2/3 rounded-md my-1" />
							</div>
						))}
					</div>
				</div>
			</div>
		</Container>
	)
}

function PackDetailsContainer({ children }: { children: React.ReactNode }) {
	return <div className="space-y-1">{children}</div>
}

function PackDetailsHeader({ children }: { children: React.ReactNode }) {
	return <h2 className="font-bold text-foreground/70">{children}</h2>
}

function PackDetailsText({ children }: { children: React.ReactNode }) {
	return <span className="font-light">{children}</span>
}
