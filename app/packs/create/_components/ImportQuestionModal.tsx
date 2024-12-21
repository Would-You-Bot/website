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
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import {
  importQuestionSchemaA,
  importQuestionSchemaB
} from '@/utils/zod/questionSchemas'
import { Check, FileInput, FileUp, Loader2, X } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import clsx from 'clsx'
import { z } from 'zod'

function ImportDetails({
  setOpen
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
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
  const [questions, setQuestions] = useState<Record<string, string[]>>({})

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
          if (importQuestionSchemaA.safeParse(data).success) {
            const validData = importQuestionSchemaA.parse(data)
            setQuestions(validData)
          } else if (importQuestionSchemaB.safeParse(data)) {
            const validData = importQuestionSchemaB.parse(data)
            let newQuestions: Record<string, string[]> = {}

            for (const [key, value] of Object.entries(validData)) {
              newQuestions[key] = value.map((question) => question.question)
            }

            setQuestions(newQuestions)
          } else {
            resetImport(
              'Unknown Import Error',
              'Unknown error occurred importing, please try again.'
            )
            return
          }
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

  const resetImportModal = () => {
    setOpen(false)
    setStep(0)
    setDragEntered(false)
    setFileDropped(false)
    setFileUploaded(false)
    setInnerUploadText('Drag and drop or click here to import questions.')
    setInnerIcon(FileInput)

    const input = document.getElementById('fileInput') as HTMLInputElement
    input.files = new DataTransfer().files
  }

  return (
    <>
      <div className="px-4">
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
      </div>

      {isMobile ?
        <DrawerFooter>
          <Button
            variant="secondary"
            onClick={resetImportModal}
          >
            Cancel Import
          </Button>
          <Button disabled={!fileUploaded}>Next Step</Button>
        </DrawerFooter>
      : <AlertDialogFooter>
          <Button
            variant="secondary"
            onClick={resetImportModal}
          >
            Cancel Import
          </Button>
          <Button disabled={!fileUploaded}>Next Step</Button>
        </AlertDialogFooter>
      }
    </>
  )
}

export default function ImportQuestionModal({
  trigger
}: {
  trigger: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  return isMobile ?
      <Drawer
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Import Questions</DrawerTitle>
            <DrawerDescription>
              1 of 2 • Choose a file to import from
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <ImportDetails setOpen={setOpen} />
          </div>
        </DrawerContent>
      </Drawer>
    : <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Import Questions</AlertDialogTitle>
            <AlertDialogDescription>
              1 of 2 • Choose a file to import from
            </AlertDialogDescription>
          </AlertDialogHeader>
          <ImportDetails setOpen={setOpen} />
        </AlertDialogContent>
      </AlertDialog>
}
