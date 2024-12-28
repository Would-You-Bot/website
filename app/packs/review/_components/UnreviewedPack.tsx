'use client'

import {
	AlertDialog,
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
import { QuestionPackDetails } from '../../_components/QuestionPackDetails'
import { Textarea } from '@/components/ui/textarea'
import { Check, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PackType } from '@prisma/client'
import { packMap } from '@/types'
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

interface UnreviewedPackProps {
	id: string
	name: string
	description: string
	type: PackType
	questions: any[]
	onStatusChange?: () => void
}

export default function UnreviewedPack({
	id,
	name,
	description,
	type,
	questions,
	onStatusChange
}: UnreviewedPackProps) {
	const [rejectionReason, setRejectionReason] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [dialogState, setDialogState] = useState<'accept' | 'reject' | null>(
		null
	)

	const handleAction = async (action: 'accept' | 'reject') => {
		setIsLoading(true)

		toast.promise(
			axios.put('/api/packs/review', {
				id,
				approved: action === 'accept' ? true : false,
				message: action === 'reject' ? rejectionReason : undefined
			}),
			{
				loading: 'Processing...',
				success: () => {
					setDialogState(null)
					setRejectionReason('')
					onStatusChange?.()
					return action === 'accept' ? 'Pack Accepted' : 'Pack Rejected'
				},
				error: (error) => {
					console.error(error)
					return 'Error'
				},
				description: (data) => {
					console.log(data)
					if (data instanceof Error) return 'Failed to process the request'
					return action === 'accept' ?
							'The pack has been approved and is now public'
						:	'The pack has been rejected and the author will be notified'
				}
			}
		)

		setIsLoading(false)
	}

	const handleDialogClose = () => {
		// Reset rejection reason when dialog closes
		setRejectionReason('')
		setDialogState(null)
	}

	return (
		<Card className="relative border-none h-full flex flex-col justify-between">
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<div>
				<CardContent className="grid grid-cols-2">
					<div className="flex flex-col gap-0.5">
						<h3 className="text-sm text-muted-foreground">Questions</h3>
						<p className="">{questions.length}</p>
					</div>
					<div className="flex flex-col gap-0.5">
						<h3 className="text-sm text-muted-foreground">Type</h3>
						<p className="">{packMap[type]}</p>
					</div>
				</CardContent>
				<CardFooter className="grid grid-cols-2 gap-2 mt-auto h-fit">
					<AlertDialog
						open={dialogState === 'accept'}
						onOpenChange={(open) => !open && handleDialogClose()}
					>
						<AlertDialogTrigger asChild>
							<Button
								variant="success"
								onClick={() => setDialogState('accept')}
							>
								<Check className="mr-2 h-4 w-4" />
								Accept
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Accept pack?</AlertDialogTitle>
								<AlertDialogDescription>
									Accepting this pack will make it public and available to all
									users. Are you sure you want to proceed?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<Button
									onClick={() => handleAction('accept')}
									className="flex gap-2"
									disabled={isLoading}
								>
									{isLoading && (
										<Loader2 className="size-4 animate-spin transition" />
									)}
									{isLoading ? 'Processing...' : 'Confirm'}
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<AlertDialog
						open={dialogState === 'reject'}
						onOpenChange={(open) => !open && handleDialogClose()}
					>
						<AlertDialogTrigger asChild>
							<Button
								variant="destructive"
								disabled={isLoading}
								onClick={() => setDialogState('reject')}
							>
								<X className="mr-2 h-4 w-4" />
								Reject
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Reject Pack?</AlertDialogTitle>
								<AlertDialogDescription>
									Please enter a reason for rejecting the pack below
								</AlertDialogDescription>
							</AlertDialogHeader>
							<Textarea
								placeholder="Enter rejection reason..."
								value={rejectionReason}
								onChange={(e) => setRejectionReason(e.target.value)}
								className="min-h-[100px]"
							/>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<Button
									variant="destructive"
									onClick={() => handleAction('reject')}
									disabled={!rejectionReason.trim() || isLoading}
									className="flex gap-2"
								>
									{isLoading && (
										<Loader2 className="size-4 animate-spin transition" />
									)}
									{isLoading ? 'Processing...' : 'Confirm'}
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<div className="col-span-2">
						<QuestionPackDetails
							id={id}
							type={type}
							isReview
						/>
					</div>
				</CardFooter>
			</div>
		</Card>
	)
}
