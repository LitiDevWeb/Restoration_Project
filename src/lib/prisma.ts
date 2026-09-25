import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@webapp/generated/prisma/client";

/**
 * Single Prisma client shared by every API route and by the seed script.
 *
 * SQLite keeps an open handle on the database file, so creating a new client per
 * request (and disconnecting it) churns handles, and in development it leaks one
 * client per hot reload. The instance is cached on `globalThis` outside production
 * so hot reloads reuse the same connection.
 *
 * Prisma 7 dropped the Rust query engine, so a driver adapter is mandatory:
 * better-sqlite3 owns the connection and resolves the relative `file:` URL in
 * DATABASE_URL against the process working directory, which is the project root
 * for `next dev`, `next start` and the container in docker-compose.
 */
const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL as string });

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
