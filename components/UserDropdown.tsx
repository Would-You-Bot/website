'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/user-dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IdTokenJWT } from '@/helpers/oauth/types'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface UserDropdownProps {
  idToken: IdTokenJWT | null
  items: { label: string; href: string; icon: any }[]
}

export default function UserDropdown({ idToken, items }: UserDropdownProps) {
  const user = idToken?.payload
  const currentPathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-[8px] h-full p-2 transition hover:bg-foreground/5">
        <Avatar>
          <AvatarImage
            src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.jpg`}
          />
          <AvatarFallback>
            <Image
              src="https://cdn.discordapp.com/embed/avatars/1.png"
              alt="avatar example"
              width={90}
              height={90}
            />
          </AvatarFallback>
        </Avatar>
        <span className="text-lg text-foreground max-w-[60px] lg:max-w-[100px] xl:max-w-full truncate">
          {user?.username}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
          >
            <DropdownMenuItem className="flex gap-2">
              <item.icon className="mt-0.5 h-4 w-4" />
              <span>{item.label}</span>
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <a
          href={`/logout?redirect=${encodeURIComponent(currentPathname)}`}
          className="w-full text-[#F00505]"
        >
          <DropdownMenuItem className="flex w-full items-center gap-2">
            <LogOut className="mt-0.5 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
