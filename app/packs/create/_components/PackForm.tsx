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
  ArrowLeft,
  EllipsisVertical,
  FileInput,
  FileOutput,
  Loader2,
  Pen,
  Plus,
  Search,
  Send,
  Trash2,
  XCircle
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import ExportQuestionModal from '../../_components/ExportQuestionModal'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLocalStorage } from '@/hooks/use-localstorage'
import { PackData, packSchema } from '@/utils/zod/schemas'
import { packLanguages, packTypes } from '@/lib/constants'
import ImportQuestionModal from './ImportQuestionModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { PackLanguage, PackType } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import QuestionModal from './QuestionModal'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const defaultValues = {
  type: '',
  name: '',
  language: 'en_EN',
  description: '',
  tags: [],
  questions: []
}

function PackForm() {
  const [formData, setFormData] = useLocalStorage<PackData>(
    'PACKVALUES',
    defaultValues as PackData
  )

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    getValues,
    trigger,
    control,
    formState: { errors, isSubmitting }
  } = useForm<PackData>({
    resolver: zodResolver(packSchema),
    defaultValues: formData
  })
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create')
  const [indexToEdit, setIndexToEdit] = useState<number | null>(null)
  const [tagInputValue, setTagInputValue] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const step = searchParams.get('step')
  const {
    tags: selectedTags,
    questions: addedQuestions,
    type,
    language
  } = watch()

  // SWITCH between steps
  function switchStep(step: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('step', step)
    router.push(`?${params.toString()}`)
  }

  // ADD a tag to the tags array
  const filterAndAddTag = (tag: string) => {
    const trimmedValue = tag.trim()
    const tagAlreadyExists = selectedTags.includes(trimmedValue)
    const tagsAreLessThanMax = selectedTags.length < 10

    if (trimmedValue && !tagAlreadyExists && tagsAreLessThanMax) {
      const newTags = [...selectedTags, trimmedValue]
      setValue('tags', newTags)
      setFormData({ ...getValues(), tags: newTags })
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

  // DELETE tags
  const deleteTag = (tagToDelete: string) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagToDelete)
    setValue('tags', updatedTags)
    setFormData({ ...getValues(), tags: updatedTags })
  }

  // SWITCH pack type
  const handleTypeChange = (value: PackType) => {
    setValue('type', value)
    setFormData({ ...getValues(), type: value })
    clearErrors('type')
  }

  // SWITCH pack language
  const handleLanguageChange = (value: PackLanguage) => {
    setValue('language', value)
    setFormData({ ...getValues(), language: value })
    clearErrors('language')
  }

  // Check all fields are valid before switching steps
  const validateBeforeMoving = async () => {
    const currentValues = getValues()
    const isValid = await trigger(['type', 'name', 'description', 'tags'])

    if (isValid) {
      switchStep('2')
      setFormData(currentValues)
    } else {
      return
    }
  }

  // DELETE a specific question
  const deleteQuestion = (Qindex: number) => {
    setIndexToEdit(null)
    const updatedQuestions = addedQuestions.filter(
      (_, index) => index !== Qindex
    )
    setValue('questions', updatedQuestions)
    setFormData({ ...getValues(), questions: updatedQuestions })
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

  const onSubmit = async (data: PackData) => {
    try {
      const res = await fetch('/api/packs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        toast({
          title: 'Success!',
          description: 'Successfully submitted your question pack!'
        })
        router.push('/packs')
        // Reset storage
        setFormData(defaultValues as PackData)
      } else {
        throw new Error('Failed to submit pack')
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Oops',
        description: 'Something went wrong with creating your pack!',
        variant: 'destructive'
      })
    }
  }

  // NAME and DESCRIPTION are handled by Hook form so they're not automatically updated in local storage on change
  // only when some other field changes I.E type or tags as these pull all the current data from hook-form and set to storage
  // we could potentially store the NAME and DESCRIPTION on change with a useEffect but idk they seem like really simple fields
  // plus i doubt users would refresh all the time. everything is captured and stored before switching steps tho

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          !step || step === '1' ?
            <section className="grid gap-6 max-w-screen-md">
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
                  minLength={4}
                  maxLength={100}
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
                  minLength={10}
                  maxLength={500}
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
                      className="flex items-center gap-1 px-2 py-1 mr-1 text-left break-all text-xs rounded-lg dark:bg-[#1D1D1D] bg-background-light cursor-pointer"
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
              <Button
                type="button"
                onClick={validateBeforeMoving}
                className="rounded-lg w-fit py-2 px-4 bg-brand-blue-100 hover:bg-brand-blue-200 text-white"
                size="sm"
              >
                Next
              </Button>
            </section>
            //  second step adding questions to the pack
          : <section className="space-y-8  min-h-[calc(100vh-160px)]">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    className="rounded-lg w-fit py-2 px-4 flex gap-2 self-end"
                    size="sm"
                    variant="outline"
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => switchStep('1')}
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ImportQuestionModal
                      trigger={
                        <Button
                          className="rounded-lg w-fit py-2 px-4 flex gap-2 self-end"
                          size="sm"
                          variant="outline"
                          type="button"
                          disabled={isSubmitting}
                        >
                          <FileInput className="size-4" />
                          Import Questions
                        </Button>
                      }
                      control={control}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ExportQuestionModal
                      trigger={
                        <Button
                          className="rounded-lg w-fit py-2 px-4 flex gap-2 self-end"
                          size="sm"
                          variant="outline"
                          type="button"
                          disabled={isSubmitting || addedQuestions.length === 0}
                        >
                          <FileOutput className="size-4" />
                          Export Questions
                        </Button>
                      }
                      questions={addedQuestions}
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <Button
                      className="rounded-lg w-fit py-2 px-4 flex gap-2 self-end"
                      size="sm"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ?
                        <Loader2 size={16} />
                      : <Send className="size-4" />}
                      {isSubmitting ? 'Submitting' : 'Submit'}
                    </Button>
                  </div>
                  <QuestionModal
                    control={control}
                    type={type}
                    mode={modalMode}
                    isOpen={showQuestionModal}
                    setIsOpen={setShowQuestionModal}
                    questionToEdit={indexToEdit}
                  />
                </div>
                {errors.questions && (
                  <p className="px-1 text-xs text-brand-red-100">
                    {errors.questions.message}
                  </p>
                )}
              </div>
              <div className="border rounded-xl overflow-hidden divide-y">
                <div className="dark:bg-[#1D1D1D] bg-background-light flex justify-between p-2 pl-4 gap-4">
                  <div className="flex items-center gap-4">
                    <p className="block w-fit">Questions</p>
                    <div className="relative hidden xs:block">
                      <Search className="size-4 absolute left-2 bottom-3 dark:text-[#666666]" />
                      <Input
                        placeholder="Search for a question"
                        className="md:w-[441px] pl-8 focus:ring-0"
                      />
                    </div>
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
                        <div className="hidden sm:flex items-center gap-4">
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
                            <span className="sr-only">
                              remove this question
                            </span>
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 sm:hidden">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
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

        }
      </form>
    </div>
  )
}

export default PackForm
