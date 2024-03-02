import { Client } from "pg";

export const client = new Client({
  host: process.env.HOST || "localhost",
  port: process.env.PORT ? parseInt(process.env.PORT) : 5432,
  database: process.env.NAME || "postgres",
  user: process.env.USER || "postgres",
  password: process.env.PASSWORD || "postgres",
});
