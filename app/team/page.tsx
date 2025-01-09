'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import GlowingHeading from '@/components/GlowingHeading'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { randomUUID } from 'node:crypto'
import { staffs } from '@/data/staffs'
import { Globe } from 'lucide-react'
import { Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"

const roles = [
  'Developers',
  'Admins',
  'Translators',
  'Contributors',
  'Beta Testers'
]

export default function Team() {
  const [filter, setFilter] = useState('')
  const [data, setData] = useState<typeof staffs>(staffs)

  const handleFilter = ({ value }: { value: string }) => {
    if (filter === value) {
      setFilter('')
    } else {
      setFilter(value)
    }
  }

  useEffect(() => {
    if (filter === '') {
      setData(staffs)
    } else {
      setData(staffs.filter((staff) => staff.categories.includes(filter)))
    }
  }, [filter])

  return (
    <Fragment>
      <Head>
        <title>Would You - Team</title>
      </Head>
      <main className="flex flex-col flex-1 gap-12 items-center max-w-8xl w-full px-8 mx-auto">
        <div className="flex w-full gap-2 flex-col">
          <GlowingHeading
            redText="Meat the"
            blueText="Team"
          />
          <p className="text-muted-foreground">
            Meet the amazing team and contributors behind Would You.
          </p>
        </div>
        <div className="flex gap-2 w-fit mx-auto max-w-full overflow-auto">
          <Button
            variant={filter === '' ? 'default' : 'secondary'}
            className="rounded cursor-pointer"
            size='sm'
            onClick={() => handleFilter({ value: '' })}
          >
            All
          </Button>
          {roles.map((role, i) => (
            <Button
              key={i}
              variant={filter === role ? 'default' : 'secondary'}
              className="rounded cursor-pointer"
              size='sm'
              onClick={() => handleFilter({ value: role })}
            >
              {role}
            </Button>
          ))}
        </div>
        <div className="w-full h-fit flex gap-4 flex-wrap items-center justify-center">
          {data
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((data) => (
              <PersonCard
                key={data.name}
                name={data.name}
                categories={data.categories}
                description={data.description}
                imageUrl={data.imageUrl}
                websiteUrl={data.websiteUrl}
              />
            ))}
        </div>
      </main>
    </Fragment>
  )
}

interface PersonCardProps {
  name: string
  categories: string[]
  description: string
  imageUrl: string
  websiteUrl?: string | null
}

const PersonCard = ({ ...props }: PersonCardProps) => {
  const { name, categories, description, imageUrl, websiteUrl } = { ...props }
  return (
    <TooltipProvider delayDuration={0}>
      <Card className="flex flex-col h-full flex-1 flex-shrink-0 flex-grow-0 justify-center items-center w-fit basis-full sm:basis-[calc(50%-0.8rem)] md:basis-[calc(33.333%-0.8rem)] lg:basis-[calc(25%-0.8rem)] xl:basis-[calc(20%-0.8rem)] rounded-xl bg-background border-transparent hover:bg-foreground/[0.025] hover:border-foreground/5 transition cursor-default relative group">
        <CardHeader className="w-full items-center">
          <Avatar className="size-24">
            <AvatarImage
              src={imageUrl}
              alt={`${name} Avatar`}
            />
            <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="w-full flex flex-col gap-4 items-center">
          <div className="flex flex-col text-center">
            <span className="text-lg">{name}</span>
            <span className="text-sm text-foreground/70">{description}</span>
          </div>
          <div className="flex flex-wrap gap-1 items-center justify-center">
            {categories.map((category, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="rounded"
              >
                {category.substring(0, category.length - 1)}
              </Badge>
            ))}
          </div>
          <div className="flex gap-1 justify-center items-center min-h-6">
            {websiteUrl && (
              <Tooltip>
                <TooltipTrigger className="">
                  <Link
                    href={websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition"
                  >
                    <Globe className="size-5 text-foreground/70 hover:text-foreground transition" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Website</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
