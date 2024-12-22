'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { UnreviewedPackDetails } from './UnreviewedPackDetails'

export interface QuestionPackProps {
	id: number
	featured?: boolean // popular
	name: string
	description: string
	likes: number
	type: string
	questions: string[]
	slug: string
}

export default function UnreviewedPack({ pack }: { pack: QuestionPackProps }) {
	return (
		<li className="p-[3px]">
			<Card className="border-none h-full">
				<CardHeader className="relative">
					<CardTitle>{pack.name}</CardTitle>
					<CardDescription>{pack.description}</CardDescription>
				</CardHeader>
				<CardContent className="grid grid-cols-2">
					<div className="flex flex-col gap-0.5">
						<h3 className="text-sm text-muted-foreground">Questions</h3>
						<p className="">{pack.questions.length}</p>
					</div>
					<div className="flex flex-col gap-0.5">
						<h3 className="text-sm text-muted-foreground">Type</h3>
						<p className="">{pack.type}</p>
					</div>
				</CardContent>
				<CardFooter>
					<UnreviewedPackDetails {...pack} />
				</CardFooter>
			</Card>
		</li>
	)
}
