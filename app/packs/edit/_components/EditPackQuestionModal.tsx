import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { PackData, questionSchema } from '@/utils/zod/schemas'
import { Control, useController } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { packTypes } from '@/lib/constants'
import { PackType } from '@prisma/client'
import { z } from 'zod'

interface EditPackQuestionModalProps {
	control: Control<PackData>
	type: PackType
	mode: 'create' | 'update'
	questionToEdit: number | null
	isOpen?: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type QuestionType = Exclude<PackType, 'mixed'>

function EditPackQuestionModal({
	control,
	type,
	mode = 'create',
	isOpen,
	questionToEdit,
	setIsOpen
}: EditPackQuestionModalProps) {
	const {
		field: { onChange, value }
	} = useController({
		name: 'questions',
		control,
		defaultValue: []
	})

	const preFilledQuestion =
		questionToEdit !== null ? value[questionToEdit].question : ''

	const [questionValue, setQuestionValue] = useState(preFilledQuestion)
	const [typeValue, setTypeValue] = useState(type === 'mixed' ? null : type)
	const [typeError, setTypeError] = useState<string | null>(null)
	const [questionError, setQuestionError] = useState<string | null>(null)

	useEffect(() => {
		if (questionToEdit !== null && mode === 'update') {
			const existingQuestion = value[questionToEdit]
			setQuestionValue(existingQuestion.question)
			setTypeValue(existingQuestion.type)
		} else {
			setQuestionValue('')
			setTypeValue(type === 'mixed' ? null : type)
		}
	}, [questionToEdit, mode, value, type])

	const validateQuestion = () => {
		const questionData = {
			question: questionValue,
			type: typeValue as QuestionType
		}

		try {
			questionSchema.parse(questionData)
			return true
		} catch (error) {
			if (error instanceof z.ZodError) {
				error.errors.forEach((err) => {
					if (err.path[0] === 'question') {
						setQuestionError(err.message)
					}
					if (err.path[0] === 'type') {
						setTypeError(err.message)
					}
				})
			}
			return false
		}
	}

	const addQuestion = () => {
		const question = questionValue.trim()
		setQuestionError(null)
		setTypeError(null)

		if (!validateQuestion()) {
			return
		}

		const newQuestions = [...value, { type: typeValue, question: question }]

		try {
			z.array(questionSchema)
				.max(100, 'You can only have 100 questions in a pack')
				.parse(newQuestions)
		} catch (error) {
			if (error instanceof z.ZodError) {
				setQuestionError(error.errors[0].message)
				return
			}
		}

		onChange(newQuestions)
		setQuestionValue('')
		setIsOpen(false)
	}

	const editQuestion = () => {
		const question = questionValue.trim()
		setQuestionError(null)
		setTypeError(null)

		if (!validateQuestion()) {
			return
		}
		if (questionToEdit === null) {
			return
		}

		// Ensure typeValue is not null for non-mixed packs
		const questionType = type === 'mixed' ? typeValue! : type

		const newQuestions = [...value]
		newQuestions[questionToEdit] = {
			type: questionType as QuestionType,
			question: question
		}

		onChange(newQuestions)
		setQuestionValue('')
		setIsOpen(false)
	}

	const handleTypeChange = (value: QuestionType) => {
		setTypeValue(value)
		setTypeError(null)
	}

	const handleQuestionInput = (value: string) => {
		setQuestionValue(value)
		if (questionValue && questionValue.trim() !== '') {
			setQuestionError(null)
		}
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="lg:text-2xl xl:text-3xl">
						{mode === 'create' ?
							<>
								Add a <span className="text-brand-red-100">New</span>{' '}
								<span className="text-brand-blue-100">Question</span>
							</>
						:	<>
								<span className="text-brand-red-100">Edit</span>{' '}
								<span className="text-brand-blue-100">Question</span>
							</>
						}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{mode === 'create' ?
							'Add a new question to your pack'
						:	'Edit your question'}
					</DialogDescription>
				</DialogHeader>
				<div className="grid flex-1 gap-2">
					<label
						htmlFor="question"
						className="sr-only"
					>
						Question
					</label>
					<Textarea
						id="question"
						rows={5}
						value={questionValue}
						onChange={(e) => handleQuestionInput(e.target.value)}
						className="w-full p-2 rounded-md resize-none"
						placeholder="Question Text"
						minLength={10}
						maxLength={300}
					/>
					{questionError && (
						<p className="px-1 text-xs text-destructive">{questionError}</p>
					)}
				</div>
				{type === 'mixed' && (
					<div className="grid flex-1 gap-2">
						<label
							htmlFor="question"
							className="sr-only"
						>
							Type
						</label>
						<Select
							value={typeValue || ''}
							onValueChange={handleTypeChange}
						>
							<SelectTrigger>
								<SelectValue placeholder="What type does this question fall under?" />
							</SelectTrigger>
							<SelectContent>
								{packTypes.map((type) =>
									type.value === 'mixed' ?
										null
									:	<SelectItem
											key={type.id}
											value={type.value}
											className="text-foreground"
										>
											{type.label}
										</SelectItem>
								)}
							</SelectContent>
						</Select>
						{typeError && (
							<p className="px-1 text-xs text-destructive">{typeError}</p>
						)}
					</div>
				)}
				<DialogFooter className="justify-end gap-2 flex-row">
					<DialogClose asChild>
						<Button
							type="button"
							className="w-fit"
							variant="secondary"
						>
							Close
						</Button>
					</DialogClose>
					<Button
						className="w-fit"
						type="submit"
						onClick={mode === 'create' ? addQuestion : editQuestion}
					>
						{mode === 'create' ? 'Add' : 'Save'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default EditPackQuestionModal
