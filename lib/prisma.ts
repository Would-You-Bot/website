import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = (): PrismaClient => {
	return new PrismaClient()
}

declare const globalThis: {
	prisma: ReturnType<typeof prismaClientSingleton>
	prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined
} & typeof global

const prisma: PrismaClient = globalThis.prismaGlobal ?? prismaClientSingleton()

export { prisma }

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

