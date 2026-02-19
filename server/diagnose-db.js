import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log("------------------------------------------");
console.log("DIAGNOSING DATABASE: ", process.env.DB_NAME);
console.log("USER: ", process.env.DB_USER);
console.log("HOST: ", process.env.DB_HOST);
console.log("------------------------------------------");

const diagnose = async () => {
  let connection;
  try {
    // 1. Connection Test
    console.log("Attempting to connect...");
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "career_guide",
      port: process.env.DB_PORT || 3306,
    });
    console.log("✅ Connection Successful!");

    // 2. Table Existence
    console.log("\nChecking tables...");
    const [tables] = await connection.query("SHOW TABLES");
    console.log(
      "Found Tables:",
      tables.map((t) => Object.values(t)[0]),
    );

    const hasUsers = tables.some((t) => Object.values(t)[0] === "users");
    if (!hasUsers) {
      console.error("❌ CRITICAL: 'users' table NOT FOUND!");
      return;
    }
    console.log("✅ 'users' table exists.");

    // 3. Row Count
    console.log("\nCounting users...");
    const [count] = await connection.query(
      "SELECT COUNT(*) as count FROM users",
    );
    console.log(`Total users in DB: ${count[0].count}`);

    // 4. Test Insert (Rollback immediately)
    console.log("\nTesting write permission (INSERT + DELETE)...");
    const testEmail = `test_diag_${Date.now()}@example.com`;
    const [insertResult] = await connection.query(
      "INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)",
      [testEmail, "password123", "Diagnostic User"],
    );
    console.log(`✅ Insert successful! ID: ${insertResult.insertId}`);

    const [deleteResult] = await connection.query(
      "DELETE FROM users WHERE id = ?",
      [insertResult.insertId],
    );
    console.log(
      `✅ Delete successful! Deleted ${deleteResult.affectedRows} row(s).`,
    );

    console.log("\n------------------------------------------");
    console.log("DIAGNOSIS COMPLETE: Database is fully operational.");
    console.log(
      "If the app is not saving data, check the backend logs for errors.",
    );
    console.log("------------------------------------------");
  } catch (error) {
    console.error("\n❌ DIAGNOSIS FAILED:", error.message);
    if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("-> Check your DB_USER and DB_PASSWORD in .env file.");
    } else if (error.code === "ECONNREFUSED") {
      console.error("-> Check if MySQL server is running on the correct port.");
    } else if (error.code === "ER_BAD_DB_ERROR") {
      console.error("-> Check if DB_NAME exists in MySQL.");
    }
  } finally {
    if (connection) await connection.end();
  }
};

diagnose();
