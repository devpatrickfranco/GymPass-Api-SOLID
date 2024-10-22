import 'dotenv/config'
import { randomUUID } from 'node:crypto';
import { Environment } from 'vitest';
import { execSync } from 'child_process'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Plase provide a DATABASE_URL environment")
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}



const prismaEnvironment: Environment = {
  name: 'prisma',
  transformMode: 'ssr',  // 'ssr' já que é backend
  async setup() {
    const schema = randomUUID()
    const databaseUrl = (generateDatabaseUrl(schema))

    process.env.DATABASE_URL = databaseUrl

    execSync('npx prisma migrate deploy ')

    return {
    async teardown() {
       await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)

       await prisma.$disconnect()  

      }
    };
  }
};

export default prismaEnvironment;
