# Node 22 satisfies the Prisma 7 engine range (^20.19 || ^22.12 || >=24) and
# Next.js 15 needs Node >= 18.18.
FROM node:22-slim

WORKDIR /app

# Prisma 7 talks to SQLite through the better-sqlite3 driver adapter, a native
# addon. Prebuilt binaries usually match, and this toolchain is here so
# `npm install` can compile the addon when none does.
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install

EXPOSE 3000