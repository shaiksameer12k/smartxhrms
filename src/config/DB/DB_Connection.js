import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let pool = null;

export function db_connection() {
  if (pool) return pool;

  try {
    pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10, // max connections in pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      options: "--search_path=public",
    });

    // test the connection
    pool.on("connect", () => {
      console.log("✅ DB Connected Successfully");
    });

    pool.on("error", (err) => {
      console.error("❌ Unexpected DB error", err.message);
    });

    return pool;
  } catch (error) {
    console.error(`❌ Error While Connecting DB: ${error.message}`);
    process.exit(1); // stop server if DB fails
  }
}
