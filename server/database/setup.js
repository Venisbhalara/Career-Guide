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

export const setupDatabase = async () => {
  let connection;
  try {
    console.log("Starting database setup...");

    // Create connection
    const config = {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
      multipleStatements: true,
      ssl: (process.env.DB_SSL === "true" || (process.env.DB_HOST && !process.env.DB_HOST.includes("localhost"))) 
        ? { rejectUnauthorized: false } 
        : null,
    };

    connection = await mysql.createConnection(config);
    console.log("Connected to MySQL server");

    const dbName = process.env.DB_NAME || "career_guide";
    
    // Try to create database, but don't fail if we don't have permissions (common in managed DBs)
    try {
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
      console.log(`Database '${dbName}' checked/created`);
    } catch (dbError) {
      console.warn(`Note: Could not create database '${dbName}' (might already exist or insufficient permissions):`, dbError.message);
    }

    // Use the database
    await connection.changeUser({ database: dbName });

    // Check if tables already exist to avoid accidental data loss
    const [rows] = await connection.query("SHOW TABLES LIKE 'users'");
    if (rows.length > 0) {
      console.log("✓ Database already initialized (users table exists). Skipping schema execution.");
      return true;
    }

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
    return true;
  } catch (error) {
    console.error("✗ Database setup failed:", error.message);
    return false;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Check if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  setupDatabase();
}
