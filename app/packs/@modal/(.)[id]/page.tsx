'use client'

import { PackDetails } from '../../_components/QuestionPackDetails'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { id: string } }) {
	const router = useRouter()
	const isMobile = useIsMobile()

	if (isMobile) {
		return (
			<Drawer
				defaultOpen
				onOpenChange={() => {
					router.back()
				}}
			>
				<DrawerContent>
					<div className="p-4">
						<PackDetails
							id={params.id}
							type="default"
						/>
					</div>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<Dialog
			defaultOpen
			onOpenChange={() => {
				router.back()
			}}
		>
			<DialogContent className="max-w-[90%] sm:max-w-lg lg:max-w-2xl">
				<PackDetails
					id={params.id}
					type="default"
				/>
			</DialogContent>
		</Dialog>
	)
}
