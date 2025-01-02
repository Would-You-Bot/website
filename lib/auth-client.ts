import { createAuthClient } from '@wouldyou/better-auth/react'

export const { signIn, signOut, useSession } = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_PAGE_URL,
})
