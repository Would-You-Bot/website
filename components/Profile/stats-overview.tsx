import { Card, CardContent } from '@/components/ui/card'

interface StatsOverviewProps {
	totalGamesPlayed: number
	highScore: number
	totalYes: number
	totalNo: number
}

export function StatsOverview({
	totalGamesPlayed,
	highScore,
	totalYes,
	totalNo
}: StatsOverviewProps) {
	return (
		<Card className="border shadow-xs">
			<CardContent className="p-6">
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
					<div className="text-center">
						<div className="text-2xl font-bold text-brand-blue-100 ">
							{totalGamesPlayed}
						</div>
						<div className="text-sm text-muted-foreground">Total Games</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-brand-blue-100">
							{highScore}
						</div>
						<div className="text-sm text-muted-foreground">High Score</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-brand-blue-100">
							{totalYes}
						</div>
						<div className="text-sm text-muted-foreground">Total Yes</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold  text-brand-blue-100">
							{totalNo}
						</div>
						<div className="text-sm text-muted-foreground">Total No</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
