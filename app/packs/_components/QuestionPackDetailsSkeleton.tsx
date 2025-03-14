'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { CopyIcon, ExternalLink, Search } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import Image from 'next/image'

const PackDetails = ({ id, type }: { id: string; type: string }) => {
	return (
		<>
			<DialogHeader>
				<Skeleton />
				<Skeleton />
			</DialogHeader>

			<section className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 my-2 lg:my-4">
				<div className="flex flex-col gap-1">
					<Skeleton />
					<div className="flex items-center gap-1">
						<Image
							src="/staff/Dominik.webp"
							alt="profile image"
							width={32}
							height={32}
							className="rounded-full"
						/>
						<Skeleton />
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<Skeleton />
					<Skeleton />
				</div>
				<div className="flex flex-col gap-1">
					<Skeleton />
					<Skeleton />
				</div>
			</section>

			<section className="grid flex-1 gap-2 my-1">
				<Skeleton />
				<div className="w-full relative">
					<Input
						id="command"
						defaultValue={`/import ${id}`}
						readOnly
						className="focus:bg-brand-blue-100/10 focus:text-brand-blue-100"
					/>
					<Button
						type="submit"
						size="sm"
						variant={'ghost'}
						className="p-2 h-fit text-brand-blue-100 hover:text-brand-blue-200 absolute right-2 top-1"
					>
						<span className="sr-only">Copy command</span>
						<CopyIcon className="h-4 w-4" />
					</Button>
				</div>
			</section>

			<section>
				<p className="text-muted-foreground my-2 text-sm capitalize">
					look inside
				</p>
				<div className="border rounded-xl overflow-hidden">
					<div className="bg-background-light flex items-center px-4 py-2 gap-4 border-b">
						<div className="relative md:w-3/4">
							<Search className="size-4 absolute left-2 bottom-3 text-muted-foreground" />
							<Input
								placeholder="Search questions"
								className="w-full pl-8 focus:ring-0"
							/>
						</div>
					</div>
					<ul className="divide-y max-h-[100px] md:max-h-[200px] overflow-y-auto thin-scrollbar">
						<Skeleton />
						<Skeleton />
						<Skeleton />
						<Skeleton />
					</ul>
				</div>
			</section>
		</>
	)
}

export function QuestionPackDetails({
	id,
	type
}: {
	id: string
	type: string
}) {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogTrigger asChild>
				<Button className="w-full">
					<ExternalLink className="mr-2 h-4 w-4 shrink-0" />{' '}
					<span>Use Pack</span>
				</Button>
			</DialogTrigger>
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
