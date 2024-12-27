'use client'

import { User, MessageCircle, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { toast } from 'sonner'

interface EditProfileProps {
	userId: string
	description: string | null
	votePrivacy: boolean
	profilePrivacy: boolean
	likedPackPrivacy: boolean
	onDataRefresh: () => void
}

export function EditProfile({
	userId,
	description: initialDescription,
	votePrivacy: initialVotePrivacy,
	profilePrivacy: initialProfilePrivacy,
	likedPackPrivacy: initialLikedPackPrivacy,
	onDataRefresh
}: EditProfileProps) {
	const [description, setDescription] = useState(initialDescription || '')
	const [votePrivacy, setVotePrivacy] = useState(initialVotePrivacy)
	const [profilePrivacy, setProfilePrivacy] = useState(initialProfilePrivacy)
	const [likedPackPrivacy, setLikedPackPrivacy] = useState(
		initialLikedPackPrivacy
	)
	const [isSaving, setIsSaving] = useState(false)

	const onDescriptionChange = (value: string) => {
		setDescription(value)
	}

	const onPrivacyToggle = (
		setting: 'profilePrivacy' | 'votePrivacy' | 'likedPackPrivacy'
	) => {
		switch (setting) {
			case 'profilePrivacy':
				setProfilePrivacy(!profilePrivacy)
				break
			case 'votePrivacy':
				setVotePrivacy(!votePrivacy)
				break
			case 'likedPackPrivacy':
				setLikedPackPrivacy(!likedPackPrivacy)
				break
		}
	}

	const saveUserSettings = async () => {
		setIsSaving(true)

		toast.promise(
			fetch(`/api/user/${userId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					description,
					votePrivacy,
					profilePrivacy,
					likedPackPrivacy
				})
			}),
			{
				loading: 'Saving...',
				success: () => {
					onDataRefresh()
					return 'Your profile has been updated successfully.'
				},
				error: () => {
					return 'Failed to save settings'
				}
			}
		)

		setIsSaving(false)
	}

	return (
		<Card className="border shadow-sm">
			<CardContent className="p-6">
				<h2 className="text-2xl font-bold text-foreground mb-4">
					<span className="text-brand-red-100 drop-shadow-red-glow">Edit</span>{' '}
					<span className="text-brand-blue-100 drop-shadow-blue-glow">
						Profile
					</span>
				</h2>
				<div className="space-y-4">
					<div>
						<Label
							htmlFor="description"
							className="text-foreground"
						>
							Description
						</Label>
						<Textarea
							id="description"
							value={description}
							onChange={(e) => onDescriptionChange(e.target.value)}
							className="mt-1"
						/>
					</div>
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-foreground">
							Privacy Settings
						</h3>
						<div className="space-y-6 rounded-lg border p-4 bg-background">
							<div>
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<User className="w-4 h-4 text-foreground" />
										<Label
											htmlFor="profile-privacy"
											className="text-foreground"
										>
											Profile Privacy
										</Label>
									</div>
									<Switch
										id="profile-privacy"
										checked={profilePrivacy}
										onCheckedChange={() => onPrivacyToggle('profilePrivacy')}
									/>
								</div>
								<p className="text-sm text-gray-500 mt-1">
									Control who can view your profile and statistics
								</p>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<MessageCircle className="w-4 h-4 text-foreground" />
										<Label
											htmlFor="vote-privacy"
											className="text-foreground"
										>
											Vote Privacy
										</Label>
									</div>
									<Switch
										id="vote-privacy"
										checked={votePrivacy}
										onCheckedChange={() => onPrivacyToggle('votePrivacy')}
									/>
								</div>
								<p className="text-sm text-gray-500 mt-1">
									Hide yourself from the public leaderboard and voting
								</p>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<Heart className="w-4 h-4 text-foreground" />
										<Label
											htmlFor="liked-packs-privacy"
											className="text-foreground"
										>
											Liked Packs Privacy
										</Label>
									</div>
									<Switch
										id="liked-packs-privacy"
										checked={likedPackPrivacy}
										onCheckedChange={() => onPrivacyToggle('likedPackPrivacy')}
									/>
								</div>
								<p className="text-sm text-gray-500 mt-1">
									Keep your liked packs collection private
								</p>
							</div>
						</div>
					</div>

					<Button
						className="w-full bg-brand-blue-100 hover:bg-brand-blue-100/90 text-white"
						onClick={saveUserSettings}
						disabled={isSaving}
					>
						{isSaving ? 'Saving...' : 'Save Changes'}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
