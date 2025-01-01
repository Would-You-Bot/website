'use client'
import { usePathname } from 'next/navigation'
import { signIn } from '@/lib/auth-client'
import { Loader2 } from 'lucide-react'
import Discord from '@/icons/Discord'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface DiscordLoginButtonProps {
	className?: string
	redirect?: string
}

export default function DiscordLoginButton({
	className,
	redirect
}: DiscordLoginButtonProps) {
	const pathname = usePathname()
	const [isLoading, setIsLoading] = useState(false)

	const handleLogin = async () => {
		try {
			setIsLoading(true)
			const { data, error } = await signIn.social({
				provider: 'discord',
				callbackURL: redirect ?? pathname
			})

			if (error) {
				console.error('Login error:', error)
			}
		} catch (error) {
			console.error('Unexpected error:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<button
			type="button"
			onClick={handleLogin}
			disabled={isLoading}
			className={cn(
				'flex min-w-fit items-center justify-center gap-2 bg-indigo-500 px-4 py-2 leading-loose text-white transition-all duration-300 hover:bg-indigo-500/90 disabled:opacity-50',
				className
			)}
		>
			<span className="hidden lg:flex">Login with Discord</span>
			<span className="flex lg:hidden">Login</span>
			{isLoading ?
				<Loader2 className='size-6 animate-spin transition'/>
			:	<Discord className="size-6" />}
		</button>
	)
}
