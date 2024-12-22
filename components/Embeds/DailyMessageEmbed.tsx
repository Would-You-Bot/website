'use client'
import {
	DiscordEmbed,
	DiscordEmbedDescription,
	DiscordEmbedFooter,
	DiscordMention,
	DiscordMessage,
	DiscordMessages,
	DiscordThread,
	DiscordThreadMessage
} from '@skyra/discord-components-react'
import profiles from '@/data/profiles.json'
import { useTheme } from 'next-themes'
import { FC } from 'react'

interface MainProps {
	threadName: string
}

const DailyMessageEmbed: FC<MainProps> = ({ threadName }) => {
	const { theme } = useTheme()
	return (
		<DiscordMessages
			lightTheme={theme === 'light'}
			className="min-w-fit overflow-x-hidden rounded-lg shadow"
		>
			<DiscordMessage
				profile="wouldyou"
				author={profiles.wouldyou.author}
				avatar={profiles.wouldyou.avatar}
				roleColor={profiles.wouldyou.roleColor}
				bot={profiles.wouldyou.bot}
				verified={profiles.wouldyou.verified}
			>
				<DiscordMention
					type="role"
					color="#1e99"
				>
					QOTD
				</DiscordMention>
				<DiscordEmbed
					slot="embeds"
					color="#1e88e5"
				>
					<DiscordEmbedDescription slot="description">
						Would you rather be able to control fire 🔥 or water 💧?
					</DiscordEmbedDescription>
					<DiscordEmbedFooter slot="footer">
						Daily Message | Type: Mixed | ID: 34
					</DiscordEmbedFooter>
				</DiscordEmbed>
				<DiscordThread
					slot="thread"
					name={threadName}
					lightTheme={theme === 'light'}
				>
					<DiscordThreadMessage
						profile="Nightkiller"
						author={profiles.nightkiller.author}
						avatar={profiles.nightkiller.avatar}
						roleColor={profiles.nightkiller.roleColor}
					>
						Wow that...
					</DiscordThreadMessage>
				</DiscordThread>
			</DiscordMessage>
		</DiscordMessages>
	)
}
export default DailyMessageEmbed
