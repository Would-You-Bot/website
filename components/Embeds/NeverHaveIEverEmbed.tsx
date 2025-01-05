'use client'
import {
	DiscordActionRow,
	DiscordAttachments,
	DiscordButton,
	DiscordCommand,
	DiscordEmbed,
	DiscordEmbedDescription,
	DiscordEmbedFooter,
	DiscordMessage,
	DiscordMessages,
	DiscordReply
} from '@skyra/discord-components-react'
import { getRandomQuestion } from '@/helpers/getRandomQuestion'
import profiles from '@/data/profiles.json'
import { useTheme } from 'next-themes'
import { FC, useState } from 'react'

interface MainProps {
	initialQuestion: string
}

type MessageType = 'vote' | 'results' | null

const NeverHaveIEverEmbed: FC<MainProps> = ({ initialQuestion }) => {
	const { theme } = useTheme()
	const [haveDone, setHaveDone] = useState<boolean | null>(null)
	const [messageType, setMessageType] = useState<MessageType>(null)
	const [replayedRounds, setReplayedRounds] = useState(0)
	const [currentQuestion, setCurrentQuestion] = useState(initialQuestion)

	const replay = () => {
		if (replayedRounds < 3) {
			setMessageType(null)
			setHaveDone(null)
			setCurrentQuestion(getRandomQuestion('nhie'))
			setReplayedRounds(replayedRounds + 1)
		}
	}

	return (
		<DiscordMessages
			lightTheme={theme === 'light'}
			className="overflow-x-hidden rounded-lg text-left shadow"
		>
			<DiscordMessage
				profile="wouldyou"
				author={profiles.wouldyou.author}
				avatar={profiles.wouldyou.avatar}
				roleColor={profiles.wouldyou.roleColor}
				bot={profiles.wouldyou.bot}
				verified={profiles.wouldyou.verified}
				edited={replayedRounds > 0}
			>
				<DiscordCommand
					slot="reply"
					profile="pod"
					author={profiles.pod.author}
					avatar={profiles.pod.avatar}
					roleColor={profiles.pod.roleColor}
					command="/neverhaveiever"
				/>
				<DiscordEmbed
					slot="embeds"
					color="#1e88e5"
				>
					<DiscordEmbedDescription slot="description">
						{currentQuestion}
					</DiscordEmbedDescription>
					<DiscordEmbedFooter
						slot="footer"
						footerImage="./staff/Pod.webp"
					>
						Requested by podskio | Type: NHIE | ID: 124
					</DiscordEmbedFooter>
				</DiscordEmbed>
				<DiscordAttachments slot="components">
					<DiscordActionRow>
						<DiscordButton
							type="secondary"
							onClick={() => setMessageType('results')}
						>
							Results
						</DiscordButton>
						<DiscordButton
							type="primary"
							onClick={() => {
								setHaveDone(true)
								setMessageType('vote')
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 36 36"
								width="36"
								height="36"
								className="h-5 w-5"
							>
								<path
									fill="#77B255"
									d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"
								/>
								<path
									fill="#FFF"
									d="M29.28 6.362a2.502 2.502 0 0 0-3.458.736L14.936 23.877l-5.029-4.65a2.5 2.5 0 1 0-3.394 3.671l7.209 6.666c.48.445 1.09.665 1.696.665.673 0 1.534-.282 2.099-1.139.332-.506 12.5-19.27 12.5-19.27a2.5 2.5 0 0 0-.737-3.458z"
								/>
							</svg>
						</DiscordButton>
						<DiscordButton
							type="primary"
							onClick={() => {
								setHaveDone(false)
								setMessageType('vote')
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 36 36"
								width="36"
								height="36"
								className="h-5 w-5"
							>
								<path
									fill="#DD2E44"
									d="M21.533 18.002 33.768 5.768a2.5 2.5 0 0 0-3.535-3.535L17.998 14.467 5.764 2.233a2.498 2.498 0 0 0-3.535 0 2.498 2.498 0 0 0 0 3.535l12.234 12.234L2.201 30.265a2.498 2.498 0 0 0 1.768 4.267c.64 0 1.28-.244 1.768-.732l12.262-12.263 12.234 12.234a2.493 2.493 0 0 0 1.768.732 2.5 2.5 0 0 0 1.768-4.267L21.533 18.002z"
								/>
							</svg>
						</DiscordButton>
					</DiscordActionRow>
					<DiscordActionRow>
						{replayedRounds < 3 ?
							<DiscordButton
								type="primary"
								onClick={() => replay()}
								emoji="/emojis/refresh.svg"
								emojiName="refresh"
							>
								New Question
							</DiscordButton>
						:	<DiscordButton
								type="secondary"
								onClick={() =>
									window.open('https://wouldyoubot.gg/invite', '_blank')
								}
								emoji="/emojis/external.svg"
								emojiName="external"
							>
								Invite Would You
							</DiscordButton>
						}
					</DiscordActionRow>
				</DiscordAttachments>
			</DiscordMessage>
			<DiscordMessage
				className={messageType == 'vote' ? 'mb-2' : 'hidden'}
				profile="wouldyou"
				author={profiles.wouldyou.author}
				avatar={profiles.wouldyou.avatar}
				roleColor={profiles.wouldyou.roleColor}
				bot={profiles.wouldyou.bot}
				verified={profiles.wouldyou.verified}
				dismissMessageClicked={() => setMessageType(null)}
				ephemeral
				lightTheme={theme === 'light'}
			>
				<DiscordReply
					slot="reply"
					profile="wouldyou"
					author={profiles.wouldyou.author}
					avatar={profiles.wouldyou.avatar}
					roleColor={profiles.wouldyou.roleColor}
					bot={profiles.wouldyou.bot}
					verified={profiles.wouldyou.verified}
					lightTheme={theme === 'light'}
					command={true}
				>
					<p style={{ whiteSpace: 'initial' }}>Click to see command</p>
				</DiscordReply>
				<p>
					You&apos;ve voted that you{' '}
					<span className="font-bold">
						{haveDone ? 'have' : 'have not'} done it
					</span>
					.
				</p>
			</DiscordMessage>
			<DiscordMessage
				className={messageType == 'results' ? '' : 'hidden'}
				profile="wouldyou"
				author={profiles.wouldyou.author}
				avatar={profiles.wouldyou.avatar}
				roleColor={profiles.wouldyou.roleColor}
				bot={profiles.wouldyou.bot}
				verified={profiles.wouldyou.verified}
				dismissMessageClicked={() => setMessageType(null)}
				ephemeral
			>
				<DiscordReply
					slot="reply"
					profile="wouldyou"
					author={profiles.wouldyou.author}
					avatar={profiles.wouldyou.avatar}
					roleColor={profiles.wouldyou.roleColor}
					bot={profiles.wouldyou.bot}
					verified={profiles.wouldyou.verified}
					lightTheme={theme === 'light'}
					command={true}
				>
					<p style={{ whiteSpace: 'initial' }}>Click to see command</p>
				</DiscordReply>
				<DiscordEmbed
					slot="embeds"
					color={haveDone ? '#0091ff' : '#f00404'}
					image={
						haveDone == null ? '/nhie-chart-50-50.webp'
						: haveDone ?
							'/nhie-chart-100-have.webp'
						:	'/nhie-chart-100-not.webp'
					}
				>
					<DiscordEmbedFooter
						slot="footer"
						footerImage={profiles.wouldyou.avatar}
					>
						{profiles.wouldyou.author} | Page 1/2
					</DiscordEmbedFooter>
				</DiscordEmbed>
				<DiscordAttachments slot="components">
					<DiscordActionRow>
						<DiscordButton
							type="secondary"
							onClick={() =>
								window.open('https://wouldyoubot.gg/invite', '_blank')
							}
							emoji="/emojis/external.svg"
							emojiName="external"
						>
							Invite Would You
						</DiscordButton>
					</DiscordActionRow>
				</DiscordAttachments>
			</DiscordMessage>
		</DiscordMessages>
	)
}
export default NeverHaveIEverEmbed
