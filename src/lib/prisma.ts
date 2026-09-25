import { PrismaClient } from "@prisma/client";

/**
 * Single Prisma client shared by every API route and by the seed script.
 *
 * SQLite keeps an open handle on the database file, so creating a new client per
 * request (and disconnecting it) churns handles, and in development it leaks one
 * client per hot reload. The instance is cached on `globalThis` outside production
 * so hot reloads reuse the same connection.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
