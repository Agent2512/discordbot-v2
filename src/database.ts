import { PrismaClient } from "@prisma/client";

export const Database: PrismaClient = globalThis.prisma ||= new PrismaClient()
