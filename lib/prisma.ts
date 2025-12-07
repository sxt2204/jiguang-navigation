import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    })

// 启用 SQLite WAL 模式提高并发性能
// prisma.$executeRawUnsafe('PRAGMA journal_mode = WAL;').catch(() => { });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
