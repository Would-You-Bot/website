import { CopyIcon, ExternalLink, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { QuestionPackProps } from './QuestionPack'

export function QuestionPackDetails({
  id,
  featured,
  name,
  description,
  likes,
  questions,
  type
}: QuestionPackProps) {
  const copyCommand = () => {
    navigator.clipboard.writeText('commnad')
    toast({
      title: 'Copied to clipboard!'
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            'w-full bg-brand-blue-100 hover:bg-brand-blue-200 text-white',
            {
              'popular-btn': featured
            }
          )}
        >
          <ExternalLink className="mr-2 h-4 w-4 shrink-0" />{' '}
          <span>Use pack</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] sm:max-w-lg lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <section className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 my-2 lg:my-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-muted-foreground text-sm">Author</h3>
            <div className="flex items-center gap-1">
              <Image
                src="/staff/Dominik.webp"
                alt="profile image"
                width={32}
                height={32}
                className="rounded-full"
              />
              <p className="capitalize">Dominik</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-muted-foreground">Questions</h3>
            <p className="capitalize">{questions.length}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-muted-foreground">Type</h3>
            <p className="capitalize">{type}</p>
          </div>
        </section>

        <section className="grid flex-1 gap-2 my-1">
          <label
            htmlFor="command"
            className="text-muted-foreground text-sm capitalize"
          >
            use the pack
          </label>
          <div className="w-full relative">
            <Input
              id="command"
              defaultValue={`/import wouldyourather ${id}`}
              readOnly
              className="focus:bg-brand-blue-100/10 focus:text-brand-blue-100"
            />
            <Button
              type="submit"
              size="sm"
              variant={'ghost'}
              onClick={() => copyCommand()}
              className="p-2 h-fit text-brand-blue-100 hover:text-brand-blue-200 absolute right-2 top-1"
            >
              <span className="sr-only">Copy command</span>
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <section>
          <p className="text-muted-foreground my-2 text-sm capitalize">
            look inside
          </p>
          <div className="border rounded-xl overflow-hidden">
            <div className="dark:bg-[#1D1D1D] bg-background-light flex items-center px-4 py-2 gap-4 border-b">
              <div className="relative md:w-3/4">
                <Search className="size-4 absolute left-2 bottom-3 dark:text-[#666666]" />
                <Input
                  placeholder="Search questions"
                  className="w-full pl-8 focus:ring-0"
                />
              </div>
            </div>
            <ul className="divide-y max-h-[100px] md:max-h-[200px] overflow-y-auto">
              {questions.map((question: string, index) => (
                <li
                  key={`${question}-${index}`}
                  className="px-4 py-2"
                >
                  <p className="line-clamp-1 text-sm">{question}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}
