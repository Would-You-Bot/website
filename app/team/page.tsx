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
          {data.map((data) => (
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

// function OldTeam() {
//   const roles = [
//     'Developers',
//     'Admins',
//     'Translators',
//     'Contributors',
//     'Beta Testers'
//   ]

//   return (
//     <>
//       <Head>
//         <title>Would You - Team</title>
//       </Head>
//       <main className="flex flex-col items-center">
//         <div className="flex mt-auto w-full max-w-8xl flex-col px-8">
//           <GlowingHeading
//             redText="Meat the"
//             blueText="Team"
//           />
//           <p className="text-muted-foreground">
//             Meet the amazing team and contributors behind Would You.
//           </p>
//         </div>
//         <div className="mx-auto h-full max-w-5xl justify-center text-center">
//           {roles.map((role) => (
//             <Fragment key={randomUUID()}>
//               <h2 className="mt-10 select-none font-semibold text-foreground/70">
//                 {role}
//               </h2>
//               <ul className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-6 text-pretty px-6 lg:mx-0 lg:max-w-none lg:gap-8 lg:px-8">
//                 {staffs
//                   .filter((staff) => staff.categories.includes(role))
//                   .map((staff) => (
//                     <li
//                       key={staff.name}
//                       className="flex basis-full transform cursor-default flex-col content-center rounded-2xl bg-background-light px-4 py-8 shadow-lg transition duration-300 ease-in-out hover:shadow-2xl sm:basis-[calc(50%-1.5rem)] sm:px-6 lg:basis-[calc(25%-2rem)] lg:px-8 lg:hover:-translate-y-2 xl:px-10"
//                     >
//                       <Image
//                         className="mx-auto h-28 w-28 rounded-full md:h-24 md:w-24"
//                         src={staff.imageUrl}
//                         width={128}
//                         height={128}
//                         alt=""
//                       />
//                       <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-foreground">
//                         {staff.name}
//                       </h3>
//                       <p className="text-sm leading-6 text-foreground/60">
//                         {staff.description}
//                       </p>
//                       {staff.websiteUrl !== null ?
//                         <ul className="mt-6 flex justify-center align-bottom">
//                           <li
//                             className="absolute bottom-5 left-1/2 -translate-x-1/2"
//                             key={staff.websiteUrl}
//                           >
//                             <Link
//                               href={staff.websiteUrl}
//                               target="_blank"
//                               className="text-foreground/60 hover:text-foreground/80"
//                             >
//                               <span className="sr-only">website link</span>
//                               <svg
//                                 className="h-5 w-5"
//                                 aria-hidden="true"
//                                 fill="currentColor"
//                                 viewBox="0 0 120 120"
//                               >
//                                 <switch>
//                                   <g>
//                                     <path d="M60 120C26.9 120 0 93.1 0 60S26.9 0 60 0s60 26.9 60 60-26.9 60-60 60M60 5C29.7 5 5 29.7 5 60s24.7 55 55 55 55-24.7 55-55S90.3 5 60 5" />
//                                     <path d="M60 120c-19.3 0-34.4-26.4-34.4-60S40.7 0 60 0s34.4 26.4 34.4 60-15.1 60-34.4 60M60 5C43.8 5 30.5 29.7 30.5 60s13.2 55 29.5 55 29.5-24.7 29.5-55S76.2 5 60 5" />
//                                     <path d="M12.2 25.6h95.6v5H12.2zm0 63.9h95.6v5H12.2zm-9.7-32h115v5H2.5z" />
//                                     <path d="M57.5 2.5h5v115h-5z" />
//                                   </g>
//                                 </switch>
//                               </svg>
//                             </Link>
//                           </li>
//                         </ul>
//                         : null}
//                     </li>
//                   ))}
//               </ul>
//             </Fragment>
//           ))}
//         </div>
//       </main>
//     </>
//   )
// }
