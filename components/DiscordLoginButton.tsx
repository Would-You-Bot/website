'use client'
import { usePathname } from 'next/navigation'
import Discord from '@/icons/Discord'
interface DiscordLoginButtonProps {
  className?: string
  redirect?: string
}

export default function DiscordLoginButton({
  className,
  redirect
}: DiscordLoginButtonProps) {
  const pathname = usePathname()
  return (
    <>
      <a
        href={`/login?redirect=${encodeURIComponent(redirect ?? pathname)}&prompt=yes`}
        className={`flex min-w-fit items-center justify-center gap-2 bg-indigo-500 px-4 py-2 leading-loose text-white transition-all duration-300 hover:bg-indigo-500/90 ${className}`}
      >
        <span className="hidden lg:flex">Login with Discord</span>
        <span className="flex lg:hidden">Login</span>
        <Discord className="h-6 w-6" />
      </a>
    </>
  )
}
