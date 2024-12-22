import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { GamepadIcon, Languages } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import roles from '@/data/roles.json'
import { useState } from 'react'
import Image from 'next/image'

interface UserCardProps {
	userData: {
		userID: string
		bannerUrl: string
		avatarUrl: string
		displayName: string
		globalName: string
		description: string | null
		createdAt: string
		language: string
	}
}

const languageMap: Record<string, string> = {
	en_EN: 'English',
	es_ES: 'Spanish',
	fr_FR: 'French',
	de_DE: 'German',
	it_IT: 'Italian'
}

export function UserCard({ userData }: UserCardProps) {
	const userRole = roles.find((role) => role.id === userData.userID)
	const [bannerSrc, setBannerSrc] = useState(
		userRole ? userData.bannerUrl.replace('png', 'gif') : userData.bannerUrl
	)

	const handleBannerError = () => {
		setBannerSrc(userData.bannerUrl)
	}

	return (
		<Card className="border shadow-sm h-fit sticky top-[112px]">
			<CardContent className="p-4">
				<div className="relative">
					<div className="h-20 rounded-lg overflow-hidden">
						<Image
							alt="Profile banner"
							className="w-full h-full object-cover"
							src={bannerSrc || '/ProfileBanner.png'}
							height={80}
							width={280}
							onError={handleBannerError}
						/>
					</div>
					<Avatar className="absolute -bottom-4 left-4 w-16 h-16 border-4 border-background">
						<AvatarImage
							src={userData.avatarUrl}
							alt={`${userData.displayName}'s avatar`}
						/>
						<AvatarFallback>{userData.displayName.charAt(0)}</AvatarFallback>
					</Avatar>
				</div>
				<div className="mt-12">
					<div className="flex items-center gap-2 flex-wrap">
						<h1 className="text-xl font-bold text-foreground">
							{userData.displayName}
						</h1>
						{userRole && (
							<Badge
								variant="outline"
								style={{ color: userRole.color, borderColor: userRole.color }}
								className="font-semibold"
							>
								{userRole.role}
							</Badge>
						)}
					</div>
					<p className="text-sm text-muted-foreground">
						@{userData.globalName}
					</p>
					<p className="text-sm text-foreground mt-1">{userData.description}</p>
				</div>
				<Separator className="my-4" />
				<div className="space-y-2 text-sm text-foreground">
					<div className="flex items-center gap-2">
						<GamepadIcon
							className="w-4 h-4"
							aria-hidden="true"
						/>

						<TooltipProvider delayDuration={0}>
							<Tooltip>
								<TooltipTrigger className="cursor-default">
									<span>
										Joined {new Date(userData.createdAt).toLocaleDateString()}{' '}
									</span>
								</TooltipTrigger>
								<TooltipContent className="bg-background-darker">
									<p>
										{Math.floor(
											(new Date().getTime() -
												new Date(userData.createdAt).getTime()) /
												(1000 * 60 * 60 * 24)
										)}{' '}
										days ago
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<div className="flex items-center gap-2">
						<Languages
							className="w-4 h-4"
							aria-hidden="true"
						/>
						<span>{languageMap[userData.language]}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
