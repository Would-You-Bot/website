import { ThumbsUp, ThumbsDown, Flag, Trophy, GamepadIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

interface GameStatsProps {
	wouldYouRather?: {
		yes: number
		no: number
		used: { command: number; replay: number }
	}
	neverHaveIEver?: {
		yes: number
		no: number
		used: { command: number; replay: number }
	}
	whatWouldYouDo?: {
		yes: number
		no: number
		used: { command: number; replay: number }
	}
	higherLower?: {
		yes: number
		no: number
		highscore: number
		used: { command: number; replay: number }
	}
}

export function GameStats({
	wouldYouRather,
	neverHaveIEver,
	whatWouldYouDo,
	higherLower
}: GameStatsProps) {
	return (
		<Card className="border shadow-sm">
			<CardContent className="p-6 space-y-6">
				{wouldYouRather && (
					<GameStatSection
						title="Would You Rather"
						yes={wouldYouRather.yes}
						no={wouldYouRather.no}
						used={wouldYouRather.used}
						Icon={ThumbsUp}
					/>
				)}
				{neverHaveIEver && (
					<GameStatSection
						title="Never Have I Ever"
						yes={neverHaveIEver.yes}
						no={neverHaveIEver.no}
						used={neverHaveIEver.used}
						Icon={Flag}
					/>
				)}
				{whatWouldYouDo && (
					<GameStatSection
						title="What Would You Do"
						yes={whatWouldYouDo.yes}
						no={whatWouldYouDo.no}
						used={whatWouldYouDo.used}
						Icon={ThumbsUp}
					/>
				)}
				{higherLower && (
					<HigherLowerStats
						highscore={higherLower.highscore}
						used={higherLower.used}
					/>
				)}
			</CardContent>
		</Card>
	)
}

interface GameStatSectionProps {
	title: string
	yes: number
	no: number
	used: { command: number; replay: number }
	Icon: React.ElementType
}

function GameStatSection({ title, yes, no, used, Icon }: GameStatSectionProps) {
	const total = yes + no
	const yesPercentage = total > 0 ? (yes / total) * 100 : 0

	return (
		<div>
			<h3 className="font-semibold mb-2 text-foreground">{title}</h3>
			<div className="flex items-center gap-4 mb-2">
				<Progress
					value={yesPercentage}
					className="flex-1"
				/>
				<div className="flex gap-2 text-sm">
					<Badge
						variant="success"
						className="pointer-events-none"
					>
						<Icon className="w-3 h-3 mr-1" />
						{yes}
					</Badge>
					<Badge
						variant="destructive"
						className="pointer-events-none"
					>
						<ThumbsDown className="w-3 h-3 mr-1" />
						{no}
					</Badge>
				</div>
			</div>
			<div className="flex justify-between text-sm text-muted-foreground">
				<span>{used.command} commands</span>
				<span>{used.replay} replays</span>
			</div>
		</div>
	)
}

interface HigherLowerStatsProps {
	highscore: number
	used: { command: number; replay: number }
}

function HigherLowerStats({ highscore, used }: HigherLowerStatsProps) {
	return (
		<div>
			<h3 className="font-semibold mb-2 text-foreground">Higher Lower</h3>
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-2">
					<Trophy className="w-5 h-5 text-primary" />
					<span className="text-foreground">High Score:</span>
					<span className="text-primary font-semibold">{highscore}</span>
				</div>
				<Badge
					variant="secondary"
					className="bg-primary text-primary-foreground pointer-events-none"
				>
					<GamepadIcon className="w-3 h-3 mr-1" />
					{used.command} plays
				</Badge>
			</div>
			<div className="flex justify-between text-sm text-muted-foreground">
				<span>{used.command} commands</span>
				<span>{used.replay} replays</span>
			</div>
		</div>
	)
}
