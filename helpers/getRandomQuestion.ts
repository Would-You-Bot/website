type QuestionTypes = 'rather' | 'nhie' //| 'truth' | 'dare' | 'whatwouldyoudo';

const questions: Record<QuestionTypes, string[]> = {
	rather: [
		'Would you rather always be 10 minutes late or 20 minutes early?',
		'Would you rather be able to speak all languages or be able to play every musical instrument?',
		'Would you rather have a rewind button or a pause button in your life?',
		'Would you rather have super strength or super speed?',
		'Would you rather live in a haunted house or a house with no electricity?',
		'Would you rather have no one show up to your wedding or to your funeral?',
		'Would you rather not be able to taste or not be able to smell?',
		'Would you rather always have to say everything on your mind or never speak again?',
		'Would you rather be famous when you are alive and forgotten when you die, or unknown when you are alive but famous after you die?'
	],
	nhie: [
		'Never have I ever watched the Ghostbusters remake.',
		"Never have I ever 'cleaned up' by piling everything into a closet.",
		'Never have I ever sung karaoke.',
		'Never have I ever watched an episode of Gilmore Girls.',
		'Never have I ever pretended to know a stranger.',
		'Never have I ever worn sleepwear and pretended it was clothing.',
		"Never have I ever said 'excuse me' when there was no one around.",
		'Never have I ever sang in the shower.',
		'Never have I ever blamed farts on an animal.',
		'Never have I ever slept in regular clothing.',
		'Never have I ever had a nightmare about zombies chasing me.',
		"Never have I ever pretended to laugh at a joke I didn't get.",
		'Never have I ever been scared of clowns.',
		'Never have I ever thought a cartoon character was hot.',
		'Never have I ever faked being sick so I could play video games.',
		'Never have I ever tried out to be an extra in a movie.',
		'Never have I ever scored over 100 while bowling.',
		'Never have I ever played Candy Crush.',
		'Never have I ever won a game of Scrabble.',
		'Never have I ever made a duck face when taking a selfie.',
		"Never have I ever looked out the car's passenger seat window and imagined it was a scene from a music video.",
		'Never have I ever actually laughed out loud when typing LOL.',
		'Never have I ever reread an email immediately after sending it.',
		"Never have I ever daydreamed about being on a talk show and what I'd talk about.",
		'Never have I ever Googled my own name to see what comes up.',
		'Never have I ever pretended I was running from zombies while on a run.',
		'Never have I ever locked my keys in my car.',
		'Never have I ever not tipped at a restaurant.',
		'Never have I ever given money to a homeless person.',
		'Never have I ever tried to look at the sun.',
		'Never have I ever bungee-jumped.',
		'Never have I ever had surgery.'
	]
}

export const getRandomQuestion = (type: keyof typeof questions) => {
	if (!type || !questions[type])
		return `{ERROR: NO QUESTIONS FOUND FOR THIS TYPE, ${String(type)}}`
	const questionsOfType = questions[type]
	const randomIndex = Math.floor(Math.random() * questionsOfType.length)
	return questionsOfType[randomIndex]
}
