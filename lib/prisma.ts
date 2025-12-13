import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 as PrismaBetterSqlite } from '@prisma/adapter-better-sqlite3'
import path from 'path'
import process from 'process'
import { pathToFileURL, fileURLToPath } from 'url'
import fs from 'fs'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Resolve absolute path for DB to avoid relative path issues during build
let dbUrl = process.env.DATABASE_URL || 'file:dev.db'

// Ensure we have an absolute file URL in env
if (!dbUrl.startsWith('file:///')) {
    let p = dbUrl.startsWith('file:') ? dbUrl.slice(5) : dbUrl
    if (p.startsWith('./') || p.startsWith('.\\')) {
        p = p.slice(2)
    }

    // Check if the file exists in 'prisma' directory first (common convention)
    const prismaDbPath = path.resolve(process.cwd(), 'prisma', p);
    const rootDbPath = path.resolve(process.cwd(), p);

    let dbPath = rootDbPath;
    if (fs.existsSync(prismaDbPath)) {
        dbPath = prismaDbPath;
    } else if (!fs.existsSync(rootDbPath) && fs.existsSync(path.join(process.cwd(), 'prisma'))) {
        // If neither exists but prisma dir exists, prefer creating in prisma dir
        dbPath = prismaDbPath;
    }

    dbUrl = pathToFileURL(dbPath).href
    process.env.DATABASE_URL = dbUrl
}

// Convert the URL back to a file path for better-sqlite3
const dbPath = fileURLToPath(dbUrl)

export const prisma = globalForPrisma.prisma || (() => {
    // Adapter using better-sqlite3 via config object
    const adapter = new PrismaBetterSqlite({ url: dbPath })

    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    })
})()

// Enable SQLite WAL mode for concurrency
if (!globalForPrisma.prisma) {
    prisma.$executeRawUnsafe('PRAGMA journal_mode = WAL;')
        .catch((e) => {
            // Suppress error if WAL is already set or if adapter handles it differently
            console.error('Failed to enable WAL', e);
        });
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
