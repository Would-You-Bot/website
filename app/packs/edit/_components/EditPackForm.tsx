'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import {
	EllipsisVertical,
	Loader2,
	Pen,
	Plus,
	Search,
	Trash2,
	XCircle
} from 'lucide-react'
import EditPackQuestionModal from './EditPackQuestionModal'
import { PackData, packSchema } from '@/utils/zod/schemas'
import { packLanguages, packTypes } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { PackType } from '@prisma/client'
import { PackLanguage } from '@/types'
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

interface EditPackFormProps {
	data: PackData
	userId: string
	packId: string
}

function EditPackForm({ data, userId, packId }: EditPackFormProps) {
	const [previousPackData] = useState<PackData>(data)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		clearErrors,
		control,
		formState: { errors, isSubmitting }
	} = useForm<PackData>({
		resolver: zodResolver(packSchema),
		defaultValues: previousPackData
	})

	const {
		tags: selectedTags,
		questions: addedQuestions,
		type,
		language
	} = watch()

	const [tagInputValue, setTagInputValue] = useState('')
	const [showQuestionModal, setShowQuestionModal] = useState(false)
	const [modalMode, setModalMode] = useState<'create' | 'update'>('create')
	const [indexToEdit, setIndexToEdit] = useState<number | null>(null)

	const searchParams = useSearchParams()
	const resubmit = searchParams.get('resubmit')

	const onSubmit = async (data: PackData) => {
		const endpoint =
			resubmit ? `/api/resubmit/${packId}` : `/api/packs/${packId}`

		toast.promise(axios.patch(endpoint, data), {
			loading: 'Updating...',
			success: () => {
				router.push(`/profile/${userId}`)
				return resubmit ? 'Pack resubmitted!' : 'Pack updated!'
			},
			error: (error) => {
				console.error(error)
				return 'Uh oh!'
			},
			description(data) {
				console.log(data)
				if (data instanceof Error)
					return `Something went wrong while ${resubmit ? 'resubmitting' : 'updating'} your pack.`

				return `Your pack has been ${resubmit ? 'resubmitted' : 'updated'} successfully.`
			}
		})
	}

	// ADD a tag to the tags array
	const filterAndAddTag = (tag: string) => {
		const trimmedValue = tag.trim()
		const tagAlreadyExists = selectedTags.includes(trimmedValue)
		const tagsAreLessThanMax = selectedTags.length < 10

		if (trimmedValue && !tagAlreadyExists && tagsAreLessThanMax) {
			const newTags = [...selectedTags, trimmedValue]
			setValue('tags', newTags)
			setTagInputValue('')
			clearErrors('tags')
		}
	}

	// KEYDOWN listener for tag input
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!tagInputValue.trim()) return

		if (e.key === 'Enter') {
			e.preventDefault()
			filterAndAddTag(tagInputValue)
		}
	}

	const deleteQuestion = (Qindex: number) => {
		setIndexToEdit(null)
		const updatedQuestions = addedQuestions.filter(
			(_, index) => index !== Qindex
		)
		setValue('questions', updatedQuestions)
	}

	// SWITCH pack type
	const handleTypeChange = (value: PackType) => {
		setValue('type', value)
		clearErrors('type')
	}

	// SWITCH pack language
	const handleLanguageChange = (value: PackLanguage) => {
		setValue('language', value)
		clearErrors('language')
	}

	// DELETE tags
	const deleteTag = (tagToDelete: string) => {
		const updatedTags = selectedTags.filter((tag) => tag !== tagToDelete)
		setValue('tags', updatedTags)
	}

	// EDIT a specific question
	const editQuestion = (Qindex: number) => {
		setModalMode('update')
		setShowQuestionModal(true)
		setIndexToEdit(Qindex)
	}

	// ADD a specific question
	const addQuestion = () => {
		setIndexToEdit(null)
		setModalMode('create')
		setShowQuestionModal(true)
	}

	const renderSubmitText = () => {
		if (resubmit) {
			const textVariants = isSubmitting ? 'Resubmitting' : 'Resubmit'
			return textVariants
		}
		return isSubmitting ? 'Updating...' : 'Update'
	}

	return (
		<div className="mx-auto">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid gap-10 lg:grid-cols-2"
			>
				<section className="grid gap-6 max-w-screen-md">
					<div className="space-y-8">
						{/* type select */}
						<div className="space-y-3">
							<label htmlFor="type">Pack Type</label>
							<Select
								value={type}
								onValueChange={handleTypeChange}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select a pack type" />
								</SelectTrigger>
								<SelectContent>
									{packTypes.map((type) => (
										<SelectItem
											key={type.id}
											value={type.value}
											className="text-foreground"
										>
											{type.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.type && (
								<p className="px-1 text-xs text-brand-red-100">
									{errors.type.message}
								</p>
							)}
						</div>
						{/* language select */}
						<div className="space-y-3">
							<label htmlFor="language">Language</label>
							<Select
								value={language}
								onValueChange={handleLanguageChange}
							>
								<SelectTrigger>
									<SelectValue placeholder="Choose your language" />
								</SelectTrigger>
								<SelectContent>
									{packLanguages.map((language) => (
										<SelectItem
											key={language.id}
											value={language.value}
											className="text-foreground"
										>
											{language.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.language && (
								<p className="px-1 text-xs text-brand-red-100">
									{errors.language.message}
								</p>
							)}
						</div>
						{/* name field */}
						<div className="space-y-3">
							<label htmlFor="name">Pack name</label>
							<Input
								id="name"
								{...register('name')}
								placeholder="My awesome pack"
							/>
							{errors.name && (
								<p className="px-1 text-xs text-brand-red-100">
									{errors.name.message}
								</p>
							)}
						</div>
						{/* description field */}
						<div className="space-y-3">
							<label htmlFor="description">Pack description</label>
							<Textarea
								id="description"
								rows={6}
								{...register('description')}
								placeholder="My awesome pack description"
							/>
							{errors.description && (
								<p className="px-1 text-xs text-brand-red-100">
									{errors.description.message}
								</p>
							)}
						</div>
						{/* tags field */}
						<div className="space-y-3">
							<label htmlFor="tags">Tags</label>
							<Input
								id="tags"
								value={tagInputValue}
								onChange={(e) => setTagInputValue(e.target.value)}
								placeholder="Add some cool tags"
								onKeyDown={handleKeyDown}
								minLength={4}
								maxLength={50}
								disabled={selectedTags.length >= 10}
							/>
							<div className="flex gap-2 items-center flex-wrap">
								{selectedTags.map((tag) => (
									<button
										type="button"
										key={tag}
										onClick={() => deleteTag(tag)}
										className="flex items-center gap-1 px-2 py-1 mr-1 text-xs rounded-lg dark:bg-[#1D1D1D] bg-background-light cursor-pointer"
									>
										<span>
											<XCircle size={14} />
										</span>
										{tag}
									</button>
								))}
							</div>
							{errors.tags && (
								<p className="px-1 text-xs text-brand-red-100">
									{errors.tags.message}
								</p>
							)}
						</div>
					</div>
				</section>

				{/*  */}

				<section className="space-y-8">
					<EditPackQuestionModal
						control={control}
						type={type}
						mode={modalMode}
						isOpen={showQuestionModal}
						setIsOpen={setShowQuestionModal}
						questionToEdit={indexToEdit}
					/>
					<div className="flex flex-col gap-2">
						{errors.questions && (
							<p className="px-1 text-xs text-brand-red-100">
								{errors.questions.message}
							</p>
						)}
					</div>
					<div className="border rounded-xl overflow-hidden divide-y">
						<div className="dark:bg-[#1D1D1D] bg-background-light flex justify-between p-2 pl-4 gap-4">
							<div className="relative hidden xs:block xs:w-72">
								<Search className="size-4 absolute left-2 bottom-3 dark:text-[#666666]" />
								<Input
									placeholder="Search through your questions"
									className="pl-8"
								/>
							</div>
							<Button
								size={'icon'}
								variant={'ghost'}
								type="button"
								onClick={addQuestion}
							>
								<Plus className="text-muted-foreground size-4" />
							</Button>
						</div>
						<ul className="divide-y max-h-[700px] overflow-y-auto">
							{addedQuestions.map((question, index) => (
								<li
									key={`${question}-${type}-${index}`}
									className="flex justify-between p-2 pl-4 items-center gap-2"
								>
									<p className="text-sm lg:text-base py-2">
										{question.question}
									</p>
									<div className="flex items-center gap-2 sm:gap-4 bg-background">
										<div className="hidden sm:flex items-center gap-2">
											<Badge variant="outline">{question.type}</Badge>
											<Button
												size={'icon'}
												variant={'ghost'}
												type="button"
												onClick={() => editQuestion(index)}
												className="hover:text-brand-blue-100"
											>
												<Pen className="size-4" />
												<span className="sr-only">edit this question</span>
											</Button>
											<Button
												size={'icon'}
												variant={'ghost'}
												onClick={() => deleteQuestion(index)}
												type="button"
												className="hover:text-brand-red-100"
											>
												<Trash2 className="size-4" />
												<span className="sr-only">remove this question</span>
											</Button>
										</div>
										<div className="flex items-center gap-2 sm:hidden">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														size={'icon'}
														variant={'ghost'}
													>
														<EllipsisVertical className="size-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>
														Type: {question.type}
													</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DropdownMenuItem asChild>
														<button
															onClick={() => editQuestion(index)}
															className="w-full flex-items-center gap-2"
														>
															<Pen className="size-4" />
															<span>Edit</span>
														</button>
													</DropdownMenuItem>
													<DropdownMenuItem className="focus:text-red-400">
														<button
															onClick={() => deleteQuestion(index)}
															className="w-full flex items-center gap-2"
														>
															<Trash2 className="size-4" />
															<span>Delete</span>
														</button>
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</section>

				{/*  */}
				<div className="lg:col-span-2">
					<Button className="hover:bg-brand-blue-300 bg-brand-blue-100 w-40 text-white">
						{isSubmitting && <Loader2 size={16} />}
						<span className="ml-2">{renderSubmitText()}</span>
					</Button>
				</div>
			</form>
		</div>
	)
}

export default EditPackForm
