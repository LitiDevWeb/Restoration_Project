import "dotenv/config";
import { defineConfig, env } from "prisma/config";

/**
 * Prisma CLI configuration (Prisma 7+).
 *
 * Since v7 the connection URL is no longer allowed inside the `datasource`
 * block of `prisma/schema.prisma`: the CLI (migrate, db seed, studio) reads it
 * from here instead, and the application runtime gets it from the better-sqlite3
 * driver adapter wired up in `src/lib/prisma.ts`.
 *
 * `import "dotenv/config"` is required because Prisma 7 stopped loading `.env`
 * on its own.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // Prisma 7 no longer auto-seeds after `migrate dev`/`migrate reset`, and the
    // `prisma.seed` entry in package.json is ignored, so the command lives here.
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Relative SQLite paths resolve against this file (the project root), which
    // is also the working directory the driver adapter resolves them against.
    url: env("DATABASE_URL"),
  },
});
