'use client'

import CopyCommandWrapper from '@/components/CopyCommand'
import { useEffect, useRef, useState } from 'react'
import commands from '../../data/commands.json'
import { Input } from '../ui/input'
import Link from 'next/link'

export default function Commands() {
	interface Command {
		name: string
		description: string
		usage: string
		category: string[]
		subcommands?: string[]
		options?: string[]
	}

	const [openedCommand, setOpenedCommand] = useState('')
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [filteredCommands, setFilteredCommands] = useState<Command[]>(
		commands as object as Command[]
	)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const performSearch = () => {
			const lowerCaseTerm = searchTerm.toLowerCase()

			const filtered = commands.filter(
				(command) =>
					command.name.toLowerCase().includes(lowerCaseTerm) ||
					command.description.toLowerCase().includes(lowerCaseTerm)
			)

			setFilteredCommands(filtered as object as Command[])
		}

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}

		timeoutRef.current = setTimeout(performSearch, 500)
	}, [searchTerm])

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const categories = ['Settings', 'Utility', 'Games']

	return (
		<>
			<h1 className="text-4xl font-bold text-brand-red-100 drop-shadow-red-glow">
				Commands
			</h1>
			<div className="mt-8 flex flex-col gap-4">
				<h2 className="select-none font-semibold text-foreground/70">
					Search for a command
				</h2>
				<Input
					type="text"
					onChange={handleSearchChange}
					id="search"
					placeholder="Enter a command to search (e.g., 'help')"
				/>
				{categories.map((category, index) => {
					// Filter commands for the current category
					const categoryCommands = filteredCommands.filter((command) =>
						command.category.includes(category)
					)

					// Render only if there are commands in the category
					if (categoryCommands.length > 0) {
						return (
							<div
								key={index}
								className="space-y-4"
							>
								<h2 className="mt-10 select-none font-semibold text-foreground/70">
									{category}
								</h2>
								{categoryCommands.map((command) => {
									const isActive = openedCommand === command.name

									return (
										<div
											className={`relative cursor-pointer overflow-hidden rounded-lg p-4 text-foreground/70 transition-all duration-300 ${
												openedCommand === command.name ?
													'max-h-[250px] bg-foreground/10'
												:	'max-h-[90px] bg-foreground/5'
											}`}
											onClick={() =>
												isActive ?
													setOpenedCommand('')
												:	setOpenedCommand(command.name)
											}
											key={command.name}
										>
											<div className="flex items-center justify-between">
												<div className="grow overflow-hidden">
													<h4 className="mb-1 text-lg font-bold text-foreground">
														<span className="mr-0.5 text-foreground/50">/</span>
														{command.name}
													</h4>
													<p className="mb-3 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm">
														{command.description}
													</p>
												</div>
												<div className="h-[30px] w-[30px]">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="30"
														height="30"
														fill="currentColor"
														viewBox="0 0 30 30"
														className={`transition-all duration-300 ${
															isActive ?
																'rotate-180 text-foreground/70'
															:	'text-foreground/50'
														}`}
													>
														<path d="M15 20.938a.93.93 0 0 1-.663-.275l-8.75-8.75a.938.938 0 1 1 1.327-1.327L15 18.674l8.088-8.088a.938.938 0 1 1 1.326 1.327l-8.75 8.75a.94.94 0 0 1-.665.274Z" />
													</svg>
												</div>
											</div>
											<div
												className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
											>
												<h5 className="mb-1">Usage</h5>
												<CopyCommandWrapper>{command.usage}</CopyCommandWrapper>
												{command.subcommands && (
													<>
														<h5 className="mb-1">Subcommands</h5>
														<h6 className="w-fit rounded-md bg-background-light dark:bg-background-dark px-2 py-1 font-mono text-xs">
															{command.subcommands.join(', ')}
														</h6>
													</>
												)}
												{command.options && (
													<>
														<h5 className="mb-1">Options</h5>
														<h6 className="w-fit rounded-md bg-background-light dark:bg-background-dark px-2 py-1 font-mono text-xs">
															{command.options.join(', ')}
														</h6>
													</>
												)}
											</div>
										</div>
									)
								})}
							</div>
						)
					}
					// If no commands in the category, return null
					return null
				})}
				{filteredCommands.length === 0 && (
					<p className="select-none font-medium text-foreground/70">
						No commands for your search were found!{' '}
						<Link
							className="font-semibold"
							href="/discord"
							target="_blank"
						>
							Maybe suggest it?
						</Link>
					</p>
				)}
			</div>
		</>
	)
}
