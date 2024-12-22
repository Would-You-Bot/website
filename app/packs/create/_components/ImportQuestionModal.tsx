import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  importQuestionSchemaA,
  importQuestionSchemaB
} from '@/utils/zod/questionSchemas'
import { Check, FileInput, FileUp, Loader2, X } from 'lucide-react'
import { useLocalStorage } from '@/hooks/use-localstorage'
import { Control, useController } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { PackData } from '@/utils/zod/schemas'
import { Input } from '@/components/ui/input'
import { packMap, PackTypes } from '@/types'
import { useState } from 'react'
import clsx from 'clsx'
import { z } from 'zod'

function ImportDetails({
  setOpen,
  control
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  control: Control<PackData>
}) {
  const {
    field: { onChange: onCurrentQuestionsChange, value: currentQuestions }
  } = useController({
    name: 'questions',
    control,
    defaultValue: []
  })
  const [formData, setFormData] = useLocalStorage<PackData>(
    'PACKVALUES',
    {} as PackData
  )

  const [step, setStep] = useState(0)
  const [dragEntered, setDragEntered] = useState(false)
  const [fileDropped, setFileDropped] = useState(false)
  const [fileUploaded, setFileUploaded] = useState(false)
  const [innerUploadText, setInnerUploadText] = useState(
    'Drag and drop or click here to import questions.'
  )
  const [InnerIcon, setInnerIcon] =
    useState<React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>>(
      FileInput
    )
  const [questions, setQuestions] = useState<
    Record<string, { question: string; selected: boolean }[]>
  >({})
  const [selectedCount, setSelectedCount] = useState(currentQuestions.length)

  const isMobile = useIsMobile()
  const toast = useToast()

  const dragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }

  const dragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setDragEntered(true)
    setInnerUploadText('Upload JSON File')
    setInnerIcon(FileUp)
  }

  const dragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setDragEntered(false)
    setInnerUploadText('Drag and drop or click here to import questions.')
    setInnerIcon(FileInput)
  }

  const dropFile = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setFileDropped(true)
    setInnerUploadText('Uploading...')
    setInnerIcon(Loader2)

    const files = event.dataTransfer.files
    const input = document.getElementById('fileInput') as HTMLInputElement

    input.files = files
    input.dispatchEvent(new Event('change', { bubbles: true }))
  }

  const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()

    if (event.target.files) {
      const files = event.target.files

      if (files.length !== 1) {
        resetImport('Invalid File', 'Please only upload one file at a time.')
        return
      }

      if (files[0].type !== 'application/json') {
        resetImport('Invalid File', 'Please only upload JSON files.')
        return
      }

      reader.onload = (e) => {
        const data = JSON.parse(e.target?.result as string)

        try {
          let currentCount = selectedCount
          if (importQuestionSchemaA.safeParse(data).success) {
            const validData = importQuestionSchemaA.parse(data)
            let newQuestions: Record<
              string,
              { question: string; selected: boolean }[]
            > = {}

            for (const [key, value] of Object.entries(validData)) {
              newQuestions[key] = value.map((question) => {
                if (currentCount < 100) {
                  currentCount++
                  return { question, selected: true }
                } else {
                  return { question, selected: false }
                }
              })
            }

            setQuestions(newQuestions)
          } else if (importQuestionSchemaB.safeParse(data)) {
            const validData = importQuestionSchemaB.parse(data)
            let newQuestions: Record<
              string,
              { question: string; selected: boolean }[]
            > = {}

            for (const [key, value] of Object.entries(validData)) {
              newQuestions[key] = value.map((question) => {
                if (currentCount < 100) {
                  currentCount++
                  return { question: question.question, selected: true }
                } else {
                  return { question: question.question, selected: false }
                }
              })
            }

            setQuestions(newQuestions)
          } else {
            resetImport(
              'Unknown Import Error',
              'Unknown error occurred importing, please try again.'
            )
            return
          }
          setSelectedCount(currentCount)
        } catch (error) {
          console.error(error)
          if (error instanceof z.ZodError) {
            resetImport(
              'Validation Error',
              'An error occurred validating your data, please make sure it is valid and try again.'
            )
            return
          }

          resetImport(
            'Unknown Validation Error',
            'Unknown error occurred validating, please try again.'
          )
          return
        }

        setFileDropped(false)
        setFileUploaded(true)
        setInnerUploadText('Uploaded!')
        setInnerIcon(Check)
      }

      reader.onerror = (e) => {
        console.error(e)
        resetImport(
          'Unknown Reader Error',
          'Unknown error occurred reading data, please try again.'
        )
      }
      reader.readAsText(files[0])
    } else {
      resetImport('Unknown Error', 'Unknown error occurred, please try again.')
    }
  }

  const changeCheckState = (category: string, index: number) => {
    const selected = questions[category][index].selected
    if (selected) setSelectedCount(selectedCount - 1)
    else setSelectedCount(selectedCount + 1)

    const newQuestions = [...questions[category]]
    newQuestions[index].selected = !newQuestions[index].selected
    setQuestions({ ...questions, [category]: newQuestions })
  }

  const resetImport = (title: string, description: string) => {
    setFileDropped(false)
    setDragEntered(false)
    setInnerUploadText('Drag and drop or click here to import questions.')
    setInnerIcon(FileInput)
    toast.toast({
      title,
      description
    })
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const finishImport = () => {
    const newQuestions: { type: PackTypes; question: string }[] = [
      ...currentQuestions
    ]

    for (const [key, value] of Object.entries(questions)) {
      for (const question of value) {
        if (question.selected) {
          newQuestions.push({
            type: key as PackTypes,
            question: question.question
          })
        }
      }
    }

    onCurrentQuestionsChange(newQuestions)
    if (formData) setFormData({ ...formData, questions: newQuestions })

    resetImportModal()
  }

  const resetImportModal = () => {
    setOpen(false)
    setStep(0)
    setDragEntered(false)
    setFileDropped(false)
    setFileUploaded(false)
    setInnerUploadText('Drag and drop or click here to import questions.')
    setInnerIcon(FileInput)
  }

  return (
    <>
      {isMobile ?
        <DrawerHeader>
          <DrawerTitle>Import Questions</DrawerTitle>
          <DrawerDescription>
            {step === 0 && '1 of 2 • Choose a file to import from'}
            {step === 1 && '2 of 2 • Select the questions to import'}
          </DrawerDescription>
        </DrawerHeader>
      : <DialogHeader>
          <DialogTitle>Import Questions</DialogTitle>
          <DialogDescription>
            {step === 0 && '1 of 2 • Choose a file to import from'}
            {step === 1 && '2 of 2 • Select the questions to import'}
          </DialogDescription>
        </DialogHeader>
      }

      <div className={clsx('', { 'px-4': isMobile })}>
        {step === 0 && (
          <>
            <label
              htmlFor="fileInput"
              id="file-label"
              className={clsx(
                'flex flex-col gap-2 hover:text-brand-customPrimary transition-all items-center py-12 rounded-md border cursor-pointer border-dashed p-4 hover:border-brand-customPrimary',
                {
                  'border-muted-foreground text-muted-foreground':
                    !dragEntered && !fileDropped && !fileUploaded,
                  'border-brand-customPrimary text-brand-customPrimary':
                    dragEntered,
                  'border-success text-success pointer-events-none opacity-75':
                    fileDropped || fileUploaded
                }
              )}
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={dropFile}
            >
              <InnerIcon
                className={clsx('size-8 pointer-events-none', {
                  'animate-spin': fileDropped
                })}
              />
              <span className="pointer-events-none">
                {isMobile ? 'Press to choose file' : innerUploadText}
              </span>
              <Input
                type="file"
                name="fileInput"
                className="hidden pointer-events-none"
                id="fileInput"
                accept="application/json"
                max={1}
                onChange={fileChange}
              />
            </label>
          </>
        )}

        {step === 1 && (
          <div className="border rounded-xl overflow-hidden">
            <div className="px-4 py-2 flex flex-row items-center gap-2 justify-between sticky">
              <span>Questions</span>
              <span>{selectedCount}/100</span>
            </div>
            <ul className={'divide-y overflow-y-auto max-h-96 thin-scrollbar'}>
              {Object.keys(questions).map((key) => (
                <>
                  <li
                    key={key}
                    className="px-4 py-2 bg-white/5 rounded-none"
                  >
                    {packMap[key]}
                  </li>
                  <ul className="rounded-none border-none">
                    {questions[key].map((question, index) => (
                      <li key={`${question}-${index}`}>
                        <button
                          className={
                            'px-4 py-2 flex text-left flex-row items-center border rounded-none border-transparent border-t-border w-full gap-2 disabled:cursor-not-allowed disabled:opacity-50'
                          }
                          onClick={() => changeCheckState(key, index)}
                          disabled={!question.selected && selectedCount >= 100}
                        >
                          <Checkbox checked={question.selected} />
                          <span>{question.question}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ))}
            </ul>
          </div>
        )}
      </div>

      {isMobile ?
        <DrawerFooter>
          <Button
            variant="secondary"
            onClick={resetImportModal}
          >
            Cancel Import
          </Button>
          {step === 0 && (
            <Button
              disabled={!fileUploaded}
              onClick={nextStep}
            >
              Next Step
            </Button>
          )}
          {step === 1 && (
            <Button
              disabled={!fileUploaded}
              onClick={finishImport}
            >
              Finish Import
            </Button>
          )}
        </DrawerFooter>
      : <DialogFooter>
          <Button
            variant="secondary"
            onClick={resetImportModal}
          >
            Cancel Import
          </Button>
          {step === 0 && (
            <Button
              disabled={!fileUploaded}
              onClick={nextStep}
            >
              Next Step
            </Button>
          )}
          {step === 1 && (
            <Button
              disabled={!fileUploaded}
              onClick={finishImport}
            >
              Finish Import
            </Button>
          )}
        </DialogFooter>
      }
    </>
  )
}

export default function ImportQuestionModal({
  trigger,
  control
}: {
  trigger: React.ReactNode
  control: Control<PackData>
}) {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <div className="p-4">
            <ImportDetails
              setOpen={setOpen}
              control={control}
            />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <ImportDetails
          setOpen={setOpen}
          control={control}
        />
      </DialogContent>
    </Dialog>
  )
}
