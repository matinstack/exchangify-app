import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/db/schema";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;

const globalForPostgres = globalThis as {
  postgres? : ReturnType<typeof postgres>
}

const client = globalForPostgres.postgres ?? postgres(connectionString, {prepare: false})

if (process.env.NODE_ENV !== "production") {
  globalForPostgres.postgres = client;
}

export const db = drizzle(client, { schema: schema });
