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
	DiscordMessages
} from '@skyra/discord-components-react'
import { getRandomQuestion } from '@/helpers/getRandomQuestion'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import profiles from '@/data/profiles.json'
import { useTheme } from 'next-themes'
import { FC, useState } from 'react'

interface MainProps {
	initialQuestion: string
}

const MainDiscordEmbed: FC<MainProps> = ({ initialQuestion }) => {
	const { theme } = useTheme()
	const [replayedRounds, setReplayedRounds] = useState(0)
	const [currentQuestion, setCurrentQuestion] = useState(initialQuestion)

	const replay = () => {
		if (replayedRounds < 3) {
			setCurrentQuestion(getRandomQuestion('rather'))
			setReplayedRounds(replayedRounds + 1)
		}
	}

	return (
		<LazyMotion features={domAnimation}>
			<m.div
				initial={{ opacity: 0, transform: 'translateY(20px)' }}
				whileInView={{ opacity: 1, transform: 'translateY(0)' }}
				transition={{ duration: 0.7, ease: 'easeInOut' }}
				viewport={{ once: true }}
				style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}
			>
				<DiscordMessages
					lightTheme={theme === 'light' ? true : false}
					className="mx-auto w-auto overflow-x-hidden rounded-lg text-left shadow sm:w-2/3 lg:w-auto"
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
							profile="dominik"
							author={profiles.dominik.author}
							avatar={profiles.dominik.avatar}
							roleColor={profiles.dominik.roleColor}
							// @ts-expect-error
							clanIcon={profiles.dominik.clanIcon}
							clanTag={profiles.dominik.clanTag}
							command="/wouldyourather"
							lightTheme={theme === 'light'}
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
								footerImage="./staff/Dominik.webp"
							>
								Requested by dominikdev | Type: General | ID: 64
							</DiscordEmbedFooter>
						</DiscordEmbed>
						<DiscordAttachments slot="components">
							<DiscordActionRow>
								<DiscordButton type="secondary">Results</DiscordButton>
								<DiscordButton type="primary">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 36 36"
										width="36"
										height="36"
										className="h-5 w-5"
									>
										<path
											fill="#3B88C3"
											d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"
										/>
										<path
											fill="#FFF"
											d="M16.462 11.175h-1.829c-1.488 0-2.108-1.085-2.108-2.139 0-1.085.775-2.14 2.108-2.14h4.402c1.334 0 2.078.961 2.078 2.201V26.74c0 1.551-.992 2.418-2.326 2.418-1.333 0-2.325-.867-2.325-2.418V11.175z"
										/>
									</svg>
								</DiscordButton>
								<DiscordButton type="primary">
									<svg
										viewBox="0 0 36 36"
										width="36"
										height="36"
										className="h-5 w-5"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 36 36"
											width="36"
											height="36"
										>
											<path
												fill="#3B88C3"
												d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"
											/>
											<path
												fill="#FFF"
												d="M23.086 24.907c1.365 0 2.42.62 2.42 2.046 0 1.427-1.055 2.047-2.233 2.047H12.917c-1.364 0-2.418-.62-2.418-2.047 0-.65.403-1.209.713-1.581 2.573-3.069 5.364-5.86 7.721-9.271.558-.806 1.085-1.768 1.085-2.884 0-1.271-.961-2.387-2.233-2.387-3.566 0-1.86 5.023-4.837 5.023-1.488 0-2.264-1.054-2.264-2.264 0-3.906 3.473-7.038 7.287-7.038 3.815 0 6.883 2.512 6.883 6.449 0 4.309-4.805 8.589-7.441 11.906h5.673z"
											/>
										</svg>
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
				</DiscordMessages>
			</m.div>
		</LazyMotion>
	)
}
export default MainDiscordEmbed
