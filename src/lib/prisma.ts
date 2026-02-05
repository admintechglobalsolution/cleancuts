// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  return new PrismaClient({
    log: ["error"],
  });
}

// ⛔ DO NOT create Prisma during build
export const prisma =
  globalForPrisma.prisma ??
  (process.env.NEXT_PHASE === "phase-production-build"
    ? null
    : createPrismaClient());

// Prevent multiple instances in dev
if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}
