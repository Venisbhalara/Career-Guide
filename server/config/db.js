import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "career_guide",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Test connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✓ MySQL Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("✗ Database connection failed:", error.message);
    // Don't kill the Vercel function if DB connection fails, just log it so other routes can still handle errors
    if (!process.env.VERCEL) {
      process.exit(1);
    }
  }
};

export { pool, testConnection };
