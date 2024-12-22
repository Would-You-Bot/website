import { Check, CheckSquare2, Search, X } from 'lucide-react'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { QuestionPackProps } from '../../_components/QuestionPack'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export function UnreviewedPackDetails({
	name,
	description,
	questions,
	type
}: QuestionPackProps) {
	const approvePack = () => {
		toast({
			title: 'Approved!',
			description: 'This pack will now be added to the list'
		})
	}

	const rejectPack = () => {
		toast({
			title: 'Rejected!',
			description: 'This pack will be discarded'
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full group bg-brand-blue-100 hover:bg-brand-blue-200">
					<CheckSquare2
						fill="#ffffff"
						className="mr-2 shrink-0 text-brand-blue-100 group-hover:text-brand-blue-200 transition-colors duration-300"
					/>
					<span className="text-white">Review</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[90%] sm:max-w-lg lg:max-w-2xl">
				<DialogHeader>
					<DialogTitle>{name}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<section className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 my-2 lg:my-4">
					<div className="flex flex-col gap-1">
						<h3 className="text-muted-foreground text-sm">Author</h3>
						<div className="flex items-center gap-1">
							<Image
								src="/staff/Dominik.webp"
								alt="profile image"
								width={32}
								height={32}
								className="rounded-full"
							/>
							<p className="capitalize">Dominik</p>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<h3 className="text-sm text-muted-foreground">Questions</h3>
						<p className="capitalize">{questions.length}</p>
					</div>
					<div className="flex flex-col gap-1">
						<h3 className="text-sm text-muted-foreground">Type</h3>
						<p className="capitalize">{type}</p>
					</div>
				</section>

				<section>
					<p className="text-muted-foreground my-2 text-sm capitalize">
						look inside
					</p>
					<div className="border rounded-xl overflow-hidden">
						<div className="dark:bg-[#1D1D1D] bg-background-light flex items-center px-4 py-2 gap-4 border-b">
							<div className="relative md:w-3/4">
								<Search className="size-4 absolute left-2 bottom-3 dark:text-[#666666]" />
								<Input
									placeholder="Search questions"
									className="w-full pl-8 focus:ring-0"
								/>
							</div>
						</div>
						<ul className="divide-y max-h-[100px] md:max-h-[200px] overflow-y-auto">
							{questions.map((question: string, index) => (
								<li
									key={`${question}-${index}`}
									className="px-4 py-2"
								>
									<p className="line-clamp-1 text-sm">{question}</p>
								</li>
							))}
						</ul>
					</div>
				</section>
				<DialogFooter className="grid grid-cols-2 md:flex py-2 gap-4">
					<DialogClose asChild>
						<Button
							onClick={() => rejectPack()}
							className="group bg-brand-red-100 hover:bg-brand-red-200 text-white gap-2"
						>
							<X size={16} /> <span>Decline</span>
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							onClick={() => approvePack()}
							className="group bg-brand-blue-100 hover:bg-brand-blue-200 text-white gap-2"
						>
							<Check size={16} /> <span>Accept</span>
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
