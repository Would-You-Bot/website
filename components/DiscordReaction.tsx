import { DiscordReaction } from '@skyra/discord-components-react'
import { useState } from 'react'

interface ReactionProps {
	name: string
	emoji: string
	initialCount?: number
	children?: React.ReactNode
}

const InteractiveReaction: React.FC<ReactionProps> = (props) => {
	const [reacted, setReacted] = useState(false)
	const [count, setCount] = useState(props.initialCount ?? 1)

	return (
		<DiscordReaction
			onClick={() => {
				setReacted(!reacted)
				setCount(reacted ? count - 1 : count + 1)
			}}
			reacted={reacted}
			count={count}
			{...props}
		/>
	)
}

export default InteractiveReaction
