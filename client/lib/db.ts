// lib/db.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Ensure your .env file has DATABASE_URL="postgresql://..."
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);