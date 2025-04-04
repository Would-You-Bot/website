import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import { redirect } from 'next/navigation'

export default async function EditPage() {
	const auth = await getAuthTokenOrNull()
	const userId = auth?.payload?.id

	return redirect(userId ? `/profile/${userId}` : '/login')
}
