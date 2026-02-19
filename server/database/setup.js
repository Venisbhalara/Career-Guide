import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Load env vars
dotenv.config({
  path: path.join(path.dirname(fileURLToPath(import.meta.url)), "../.env"),
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupDatabase = async () => {
  let connection;
  try {
    console.log("Starting database setup...");

    // Create connection without database selected first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
      multipleStatements: true,
    });

    console.log("Connected to MySQL server");

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || "career_guide";
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database '${dbName}' checked/created`);

    // Use the database
    await connection.changeUser({ database: dbName });

    // Read schema file
    const schemaPath = path.join(__dirname, "schema.sql");
    const schemaSql = await fs.readFile(schemaPath, "utf8");

    // Execute schema
    console.log("Executing schema.sql...");
    await connection.query(schemaSql);
    console.log("✓ Schema executed successfully");

    // Read seed file
    const seedPath = path.join(__dirname, "seed.sql");
    const seedSql = await fs.readFile(seedPath, "utf8");

    // Execute seed
    console.log("Executing seed.sql...");
    await connection.query(seedSql);
    console.log("✓ Seed data inserted successfully");

    console.log("\nDatabase initialization completed successfully!");
  } catch (error) {
    console.error("✗ Database setup failed:", error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

setupDatabase();
