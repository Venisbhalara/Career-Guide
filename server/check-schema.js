import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log("Checking Schema for: ", process.env.DB_NAME);

const checkSchema = async () => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "career_guide",
    });

    console.log("\n--- USERS TABLE COLUMNS ---");
    const [columns] = await connection.query("DESCRIBE users");
    console.log(JSON.stringify(columns.map((c) => c.Field)));
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    if (connection) await connection.end();
  }
};

checkSchema();
