'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	Flame,
	Heart,
	Edit,
	RefreshCw,
	Trash2,
	ExternalLink
} from 'lucide-react'
import { QuestionPackDetails } from './QuestionPackDetails'
import { Button } from '@/components/ui/button'
import type { PackType } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { packMap } from '@/types'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import axios from 'axios'
import clsx from 'clsx'

export interface QuestionPackProps {
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
	style?: 'default' | 'created' | 'pending' | 'denied' | 'resubmit_pending'
	canEdit?: boolean
}

export default function QuestionPack({
	userId,
	type,
	id,
	popular,
	name,
	description,
	likes: initialLikes,
	userLiked: initialUserLiked,
	questions,
	canEdit = false,
	style = 'default',
	isLoggedIn
}: { userId: string | null; isLoggedIn: boolean } & QuestionPackProps) {
	const [likes, setLikes] = useState<number>(parseInt(initialLikes, 10))
	const [userLiked, setUserLiked] = useState<boolean>(initialUserLiked)
	const router = useRouter()

	async function likePack(packId: string) {
		if (!userId) return

		try {
			const response = await fetch(`/api/packs/${packId}/likes`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				next: {
					revalidate: false
				}
			})

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`)
			}

			const updatedLikes = await response.json()

			if (updatedLikes.userLiked) {
				setUserLiked(true)
				setLikes((prevLikes) => prevLikes + 1)
			} else {
				setUserLiked(false)
				setLikes((prevLikes) => prevLikes - 1)
			}
		} catch (error) {
			console.error('Error toggling like:', error)
		}
	}

	const deletePack = async () => {
		if (!userId) {
			return
		}

		toast.promise(axios.delete(`/api/packs/${id}`), {
			loading: 'Deleting...',
			success: () => {
				router.refresh()
				return 'Pack Deleted'
			},
			error: () => {
				return 'Error'
			},
			description(data) {
				console.log(data)
				if (data instanceof Error) return data.message

				return 'Your pack has been deleted successfully.'
			}
		})
	}

	return (
		<div
			className={cn('p-[3px]', {
				'popular-pack': popular
			})}
		>
			<Card className="border-none h-full flex flex-col justify-between">
				<div>
					<CardHeader className="relative">
						<CardTitle className="line-clamp-4">{name}</CardTitle>
						<CardDescription className="line-clamp-4">
							{description}
						</CardDescription>
						{popular && (
							<div className="flex uppercase tracking-wider items-center w-fit gap-1 px-2 py-1 rounded-md popular-badge select-none absolute -top-5 right-6 text-primary-foreground">
								<Flame className="size-4 text-primary-foreground" />
								<span className="text-[11px] hidden lg:block">Popular</span>
							</div>
						)}
					</CardHeader>

					<CardContent className="grid grid-cols-2">
						<div className="flex flex-col gap-0.5">
							<h3 className="text-sm text-muted-foreground">Questions</h3>
							<p>{questions}</p>
						</div>
						<div className="flex flex-col gap-0.5">
							<h3 className="text-sm text-muted-foreground">Type</h3>
							<p>{packMap[type]}</p>
						</div>
					</CardContent>
				</div>

				<CardFooter className="grid grid-cols-2 gap-y-4 gap-x-4">
					{style === 'default' && (
						<>
							<Button
								onClick={() => likePack(id)}
								variant="secondary"
								disabled={!isLoggedIn}
								className={clsx('w-full', {
									'opacity-50 cursor-not-allowed': !isLoggedIn
								})}
							>
								<Heart
									className={cn(
										'mr-2 h-4 w-4 shrink-0',
										userLiked ?
											'text-destructive fill-destructive'
											: 'text-muted-foreground'
									)}
								/>
								<span
									className={cn(
										'text-muted-foreground',
										userLiked && 'text-destructive'
									)}
								>
									{likes === 1 ? `${likes} Like` : `${likes} Likes`}
								</span>
							</Button>

							<Button
								className="w-full"
								onClick={() => router.push(`/packs/id/${id}`)}
							>
								<ExternalLink className="mr-2 h-4 w-4 shrink-0" />
								<span>Use Pack</span>
							</Button>
						</>
					)}

					{style === 'created' && canEdit && (
						<>
							<Button
								variant="outline"
								asChild
							>
								<Link
									href={`/packs/edit/${id}`}
									className="w-full"
								>
									<Edit className="mr-2 h-4 w-4 shrink-0" />
									Edit
								</Link>
							</Button>

							<QuestionPackDetails
								id={id}
								type={type}
							/>

							<DeleteConfirmation onConfirm={deletePack} />
						</>
					)}

					{style === 'pending' && (
						<>
							<Button
								variant="outline"
								asChild
							>
								<Link
									href={`/packs/edit/${id}`}
									className="w-full col-span-2"
								>
									<Edit className="mr-2 h-4 w-4 shrink-0" />
									Edit
								</Link>
							</Button>
						</>
					)}

					{style === 'denied' && (
						<>
							<Button
								variant="destructive"
								className="w-full"
								onClick={() => router.push(`/packs/edit/${id}?resubmit=true`)}
							>
								<RefreshCw className="mr-2 h-4 w-4 shrink-0" />
								Resubmit
							</Button>
							<Button
								variant="secondary"
								className="w-full"
								onClick={() => router.push(`/packs/edit/${id}`)}
							>
								<Edit className="mr-2 h-4 w-4 shrink-0" />
								<span>Edit</span>
							</Button>
						</>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}

const DeleteConfirmation = ({ onConfirm }: { onConfirm: () => void }) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="destructive"
					className="col-span-2"
				>
					<Trash2 className="mr-2 h-4 w-4 shrink-0" />
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete this
						question pack and remove it&apos;s data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button
							variant="destructive"
							onClick={() => onConfirm()}
						>
							Continue
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
