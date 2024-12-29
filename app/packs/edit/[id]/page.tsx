import { getAuthTokenOrNull } from '@/helpers/oauth/helpers'
import GlowingHeading from '@/components/GlowingHeading'
import EditPackForm from '../_components/EditPackForm'
import Container from '@/components/Container'
import { PackData } from '@/utils/zod/schemas'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import React from 'react'

const getPackData = async (id: string) => {
	const token = await getAuthTokenOrNull()
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/packs/${id}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token?.value ?? 'should not be here'
			},
			next: {
				revalidate: 0
			}
		}
	)
	const parsedRes = await response.json()
	const PackData = parsedRes.data as PackData
	return PackData
}

export const metadata: Metadata = {
	title: 'Edit Pack',
	description: 'Edit your packs'
}

interface PageProps {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

async function page({ params, searchParams }: PageProps) {
	const { id } = params
	const { resubmit } = searchParams

	const auth = await getAuthTokenOrNull()

	const userId = auth?.payload?.id

	const canEdit = userId === id

	const notResubmitting = resubmit !== 'true'

	const PackData = await getPackData(id)

	if (!PackData || !userId || canEdit) {
		return notFound()
	}

	return (
		<Container className="pt-8 lg:pt-10 space-y-8 min-h-[calc(100vh-112px)]">
			{!notResubmitting ?
				<GlowingHeading
					redText="Edit"
					blueText="Pack"
				/>
			:	<GlowingHeading
					redText="Update &"
					blueText="Resubmit"
				/>
			}
			<EditPackForm
				data={PackData}
				userId={userId}
				packId={id}
			/>
		</Container>
	)
}

export default page
