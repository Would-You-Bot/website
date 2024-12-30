import type { Metadata, ResolvingMetadata, Viewport } from 'next'
import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import ProfileContent from './_components/ProfileContent'

type Props = {
	params: Promise<{ id: string }>
}

export const viewport: Viewport = {
	themeColor: '#0598F6',
	maximumScale: 5
}

const getUserData = async (id: string) => {
	const token = await getAuthTokenOrNull()
	const user = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token?.value ?? 'should not be here'
			},
			next: { revalidate: 0 }
		}
	)
	const userData = await user.json()
	return userData
}

export async function generateMetadata(
	props: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const params = await props.params
	const id = params.id
	const userData = await getUserData(id)

	if (!userData || !userData.data) {
		return {
			title: 'User Not Found'
		}
	}

	const user = userData.data

	return {
		title: `${user.displayName}'s Profile | Would You`,
		description:
			user.description ||
			`Check out ${user.displayName}'s Would You profile and statistics.`,
		openGraph: {
			title: `${user.displayName}'s Would You Profile`,
			description:
				user.description ||
				`Check out ${user.displayName}'s Would You profile and statistics.`,
			url: `https://wouldyoubot.gg/profile/${id}`,
			siteName: 'Would You',
			locale: 'en_US',
			images: `https://staging.wouldyoubot.gg/api/user/${id}/og/`
		},
		twitter: {
			title: `${user.displayName}'s Would You Profile`,
			description:
				user.description ||
				`Check out ${user.displayName}'s Would You profile and statistics.`,
			images: `https://staging.wouldyoubot.gg/api/user/${id}/og/`
		}
	}
}

export default async function ProfilePage(props: Props) {
	const params = await props.params

	const { id } = params

	const auth = await getAuthTokenOrNull()
	const userId = auth?.payload?.id

	const canEdit = userId === id

	const userData = await getUserData(id)

	if (userData.message) {
		return (
			<section className="flex flex-1 items-center justify-center py-8">
				<span className="text-lg">{userData.message}</span>
			</section>
		)
	}

	if (!userData || !userData.data) {
		return (
			<section className="flex flex-1 items-center justify-center py-8">
				<span className="text-lg">User not found.</span>
			</section>
		)
	}

	return (
		<ProfileContent
			userData={userData.data}
			canEdit={canEdit}
		/>
	)
}
