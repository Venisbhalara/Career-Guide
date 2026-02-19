import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const verify = async () => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "career_guide",
      port: process.env.DB_PORT || 3306,
    });

    const tables = [
      "users",
      "careers",
      "skills",
      "career_skills",
      "courses",
      "assessment_questions",
    ];
    console.log("Verifying tables...");

    for (const table of tables) {
      const [rows] = await connection.query(
        `SELECT COUNT(*) as count FROM ${table}`,
      );
      console.log(`${table}: ${rows[0].count} rows`);
    }

    console.log("Verification complete.");
  } catch (error) {
    console.error("Verification failed:", error);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
};

verify();
