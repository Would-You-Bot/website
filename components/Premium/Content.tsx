'use client'

import {
	CloseIcon,
	StripeSquare,
	ApplePay,
	GooglePay,
	MasterCard,
	Visa,
	PayPal,
	Stripe,
	Link
} from '@/app/premium/_components/icons'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import PlansComparison from '@/app/premium/_components/PlansComparison'
import CheckoutButton from '@/app/premium/_components/checkoutButton'
import type { PricingData, DiscordGuild } from '@/app/premium/_types'
import DiscordLoginButton from '@/components/DiscordLoginButton'
import { Skeleton } from '@/components/ui/skeleton'
import { useCallback, useState } from 'react'
import { useIdToken } from '@/helpers/hooks'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const pricingData: PricingData = {
	price: { monthly: 2.99, yearly: 29.99 },
	premium: {
		'All Freemium Features': true,
		'Unlimited Custom Questions': true,
		'Customized Webhook Branding': true,
		'Prevent Questions from Repeating': true,
		'Get Rid of Button Ads': true,
		'Auto Pin Daily Messages': true,
		'Support the Development': true,
		'Take your goldfish for a walk': false
	}
}

const data = [
	{
		criteria: '5 Gamemodes',
		free: true,
		premium: true
	},
	{
		criteria: 'Question of the Day',
		free: true,
		premium: true
	},
	{
		criteria: 'Question Repeat Prevention',
		free: false,
		premium: true
	},
	{
		criteria: 'Thousands of Questions',
		free: true,
		premium: true
	},
	{
		criteria: 'Custom Questions',
		free: 'Limited (100 per category)',
		premium: 'Unlimited'
	},
	{
		criteria: 'Custom Webhook Branding',
		free: false,
		premium: true
	},
	{
		criteria: 'Auto Pin Daily Messages',
		free: false,
		premium: true
	}
]

export default function Premium() {
	const [isMonthly, setIsMonthly] = useState(true)
	const [serversData, setServersData] = useState<DiscordGuild[]>([])
	const [serverId, setServerId] = useState<string>()
	const idToken = useIdToken(null)

	const handleChange = () => {
		setIsMonthly(!isMonthly)
	}

	const handleSelectServer = (id: string) => {
		setServerId((prevId) => (prevId === id ? '' : id))
	}

	const handlePrice = () => {
		const monthlyPriceId = process.env.NEXT_PUBLIC_PREMIUM_MONTHLY_PRICE_ID
		const yearlyPriceId = process.env.NEXT_PUBLIC_PREMIUM_YEARLY_PRICE_ID
		if (!monthlyPriceId && !yearlyPriceId) {
			throw new Error('Price ID not found')
		}
		return String(isMonthly ? monthlyPriceId : yearlyPriceId)
	}

	const fetchData = useCallback(async () => {
		try {
			const response = await fetch('/api/servers')
			if (!response.ok) {
				throw new Error(`Failed to fetch: ${response.statusText}`)
			}

			const data = await response.json()
			setServersData(data)
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}, [])

	return (
		<div className="flex w-full max-w-8xl flex-col gap-52 px-8">
			<div>
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-yellow-500 drop-shadow-gold-glow">
						Premium
					</h1>
					<p className="text-customGrayText mb-6 mt-4 text-foreground/70">
						Select the plan that suits your needs and benefit from our discord
						bot.
					</p>
					<div className="mx-auto my-4 max-w-2xl text-center">
						<label className="group relative mx-auto flex h-16 w-full max-w-[13rem] cursor-pointer items-center justify-center pl-6 pr-8 rounded-2xl bg-background-light text-xl select-none">
							<input
								type="checkbox"
								className="peer appearance-none"
								checked={!isMonthly}
								onChange={handleChange}
							/>
							<span className="absolute top-0 left-2 z-10 flex h-16 w-[6rem] cursor-pointer items-center duration-300 ease-in-out after:h-12 after:w-[10rem] sm:after:w-[20rem] after:rounded-lg after:bg-brand-primary-light dark:after:bg-brand-primary after:shadow-md after:duration-300 peer-checked:after:translate-x-[6rem]" />
							<div className="z-20 flex gap-10 text-base font-bold text-foreground">
								<div className={`${!isMonthly && 'text-foreground/50'}`}>
									Monthly
								</div>
								<div className={`${isMonthly && 'text-foreground/50'}`}>
									Yearly
								</div>
							</div>
						</label>
					</div>
					<div className="mx-auto flex w-fit flex-col">
						<div className="mb-4 w-auto rounded-[1.7rem] bg-gradient-premium p-[4px]">
							<div className="relative overflow-hidden rounded-3xl bg-background-dark px-8 py-8">
								<span
									className={`${!isMonthly ? 'top-7' : 'pointer-events-none -top-10 opacity-0'} hidden xs:flex text-mb absolute right-6 cursor-default rounded-xl bg-foreground/10 px-4 py-2 text-foreground transition-all duration-300`}
								>
									2 months free
								</span>
								<h4 className="font-heading mb-2 text-left text-2xl font-bold text-foreground 2xl:mb-4">
									Premium
								</h4>
								<span
									className={`${isMonthly && 'absolute -top-10 pointer-events-none opacity-0'} flex xs:hidden w-fit text-mb cursor-default rounded-xl bg-foreground/15 px-4 py-2 text-foreground transition-all duration-300`}
								>
									2 months free
								</span>
								<div className="flex items-end justify-start">
									<div className="mr-2 mt-4 text-left text-4xl font-bold text-foreground sm:text-5xl">
										{isMonthly ?
											pricingData.price.monthly
										:	pricingData.price.yearly}
									</div>
									<div className="text-foreground/60">
										{isMonthly ? '/ month' : '/ year'}
									</div>
								</div>
								<p className="mb-8 mt-1 text-left leading-loose text-foreground/60">
									Experience the full power of our Would You bot.
								</p>
								<ul className="mb-16 text-foreground">
									{Object.entries(pricingData.premium).map(([text, value]) => (
										<li
											key={text}
											className="mb-4 flex items-center"
										>
											{value ?
												<CheckIcon className="mr-4 flex h-5 w-5 items-center justify-center rounded-full bg-transparent text-brand-primary" />
											:	<CloseIcon className="mr-4 flex h-5 w-5 items-center justify-center rounded-full bg-transparent text-muted-foreground" />
											}
											<span>{text}</span>
										</li>
									))}
								</ul>
								<Dialog>
									{idToken ?
										<DialogTrigger
											onClick={fetchData}
											className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-2 font-bold leading-loose text-foreground transition hover:bg-green-600 focus:ring-0"
										>
											Continue with Stripe
											<StripeSquare className="h-5 w-5" />
										</DialogTrigger>
									:	<DiscordLoginButton
											className="rounded-xl font-bold"
											redirect="/premium"
										/>
									}
									<DialogContent className="w-fit border-none bg-background">
										<DialogHeader>
											<DialogTitle className="text-xl font-bold text-foreground">
												<div>
													Buy <span className="text-brand-red-100">Would</span>{' '}
													<span className="text-brand-blue-100">You</span>
													{isMonthly ? ' Monthly' : ' Yearly'}
												</div>
											</DialogTitle>
										</DialogHeader>
										<div>
											<Command className="bg-background border rounded h-96 w-[300px] sm:w-[400px]">
												<CommandInput
													className="p-2 rounded-none disable-focus"
													placeholder="Search for a server..."
												/>
												<CommandList>
													<CommandEmpty>No servers found.</CommandEmpty>
													<CommandGroup className="bg-background w-full">
														{serversData.length === 0 ?
															Array.from({ length: 15 }).map((_, i) => (
																<ServerItemSkeleton key={i} />
															))
														:	serversData.map((server: DiscordGuild) => (
																<ServerItem
																	key={server.id}
																	server={server}
																	serverId={serverId || ''}
																	handleSelectServer={handleSelectServer}
																/>
															))
														}
													</CommandGroup>
												</CommandList>
											</Command>
											<CheckoutButton
												monthly={String(isMonthly)}
												priceId={handlePrice()}
												serverId={serverId}
												loading={serversData.length === 0}
											/>
										</div>
									</DialogContent>
									{idToken ?
										<p className="text-foreground/60 text-center pt-3 mb-[-15] text-wrap">
											Or click{' '}
											<a
												href="/api/subs/manage"
												className="underline font-bold text-foreground/70"
											>
												here
											</a>{' '}
											to manage your subscriptions
										</p>
									:	null}
								</Dialog>
							</div>
						</div>
						<a
							href="https://stripe.com/"
							target="_blank"
							className="flex flex-wrap justify-center gap-2 sm:gap-3"
							rel="noreferrer"
							title="Stripe Website"
						>
							<Stripe />
							<ApplePay />
							<GooglePay />
							<MasterCard />
							<Visa />
							<PayPal />
							<Link />
						</a>
					</div>
				</div>
			</div>
			<div>
				<PlansComparison
					data={data}
					rowSeparator
					colSeparator
				/>
			</div>
		</div>
	)
}

interface ServerItemProps {
	server: DiscordGuild
	handleSelectServer: (id: string) => void
	serverId: string
}

const ServerItem = ({
	server,
	handleSelectServer,
	serverId
}: ServerItemProps) => {
	return (
		<CommandItem
			key={server.id}
			value={server.name}
			onSelect={() => handleSelectServer(server.id)}
		>
			<div className="flex items-center gap-2">
				<Avatar className="h-6 w-6">
					<AvatarImage
						src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.webp`}
					/>
					<AvatarFallback>
						<Image
							src="https://cdn.discordapp.com/embed/avatars/0.png"
							alt="avatar example"
							width={90}
							height={90}
						/>
					</AvatarFallback>
				</Avatar>
				<span className="line-clamp-1 text-ellipsis">{server.name}</span>
			</div>
			<CheckIcon
				className={cn(
					'ml-auto opacity-100',
					serverId === server.id ? 'opacity-100' : 'opacity-0'
				)}
			/>
		</CommandItem>
	)
}

const ServerItemSkeleton: React.FC = () => {
	return (
		<CommandItem>
			<div className="flex items-center gap-2">
				<Avatar className="h-6 w-6">
					<AvatarFallback>
						<Skeleton className="h-6 w-6 rounded-full" />
					</AvatarFallback>
				</Avatar>
				<Skeleton className="w-52 h-4" />
			</div>
			<CheckIcon className="ml-auto opacity-0" />
		</CommandItem>
	)
}
