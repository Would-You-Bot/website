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
import { useToast } from '@/components/ui/use-toast'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { PackData } from '@/utils/zod/schemas'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import clsx from 'clsx'

function ExportDetails({
  setOpen,
  questions
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  questions: {
    type:
      | 'wouldyourather'
      | 'neverhaveiever'
      | 'whatwouldyoudo'
      | 'truth'
      | 'dare'
      | 'topic'
    question: string
  }[]
}) {
  const isMobile = useIsMobile()
  const toast = useToast()

  const [fileName, setFileName] = useState('questions')

  const updateFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.value

    name = name.replace(' ', '-')
    name = name.replace(/[^a-zA-Z0-9_.-]/g, '')

    setFileName(name)
  }

  const exportQuestions = () => {
    let data: Partial<
      Record<
        | 'wouldyourather'
        | 'neverhaveiever'
        | 'whatwouldyoudo'
        | 'truth'
        | 'dare'
        | 'topic',
        string[]
      >
    > = {}

    questions.forEach((question) => {
      if (!data[question.type]) {
        data[question.type] = []
      }

      data[question.type]!.push(question.question)
    })

    const file = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    })

    const url = URL.createObjectURL(file)

    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName}.json`
    a.click()
    URL.revokeObjectURL(url)

    resetExportModal()
  }

  const resetExportModal = () => {
    setOpen(false)
    setFileName('questions')
  }

  return (
    <>
      {isMobile ?
        <DrawerHeader>
          <DrawerTitle>Export Questions</DrawerTitle>
          <DrawerDescription>
            Customize how your questions are exported.
          </DrawerDescription>
        </DrawerHeader>
      : <DialogHeader>
          <DialogTitle>Export Questions</DialogTitle>
          <DialogDescription>
            Customize how your questions are exported
          </DialogDescription>
        </DialogHeader>
      }

      <div className={clsx('', { 'px-4': isMobile })}>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="fileName"
            className=""
          >
            File Name
          </Label>
          <div className="relative">
            <Input
              placeholder="File Name"
              className="w-full"
              name="fileName"
              autoComplete="off"
              id="fileName"
              value={fileName}
              onChange={updateFileName}
              maxLength={40}
            />
            <p className="absolute top-0 right-0 border-l-border border border-transparent rounded-none px-3 py-1.5 pointer-events-none">
              .json
            </p>
          </div>
        </div>
      </div>

      {isMobile ?
        <DrawerFooter>
          <Button
            variant="secondary"
            onClick={resetExportModal}
          >
            Cancel Export
          </Button>
          <Button onClick={exportQuestions}>Export Questions</Button>
        </DrawerFooter>
      : <DialogFooter>
          <Button
            variant="secondary"
            onClick={resetExportModal}
          >
            Cancel Export
          </Button>
          <Button onClick={exportQuestions}>Export Questions</Button>
        </DialogFooter>
      }
    </>
  )
}

export default function ExportQuestionModal({
  trigger,
  questions
}: {
  trigger: React.ReactNode
  questions: {
    type:
      | 'wouldyourather'
      | 'neverhaveiever'
      | 'whatwouldyoudo'
      | 'truth'
      | 'dare'
      | 'topic'
    question: string
  }[]
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
            <ExportDetails
              setOpen={setOpen}
              questions={questions}
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
        <ExportDetails
          setOpen={setOpen}
          questions={questions}
        />
      </DialogContent>
    </Dialog>
  )
}
