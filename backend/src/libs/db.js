import { PrismaClient } from "./prisma/index.js";


// Use globalThis to prevent multiple instances in development

const globalForPrisma = globalThis;

// Reuse existing PrismaClient instance or create a new one

export const db = globalForPrisma.prisma ?? new PrismaClient();

// In development, store the instance globally to prevent duplicates during hot reload

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

