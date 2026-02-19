import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log("Debug script starting...");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const runDebug = async () => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "career_guide",
    });

    console.log("✓ Connected to database");

    // Check if users table exists
    const [tables] = await connection.query("SHOW TABLES LIKE 'users'");
    if (tables.length === 0) {
      console.error("✗ 'users' table does not exist!");
      return;
    }
    console.log("✓ 'users' table exists");

    // Attempt to insert a test user
    const testUser = {
      email: "debug_test_user_" + Date.now() + "@example.com",
      password: "hashedpassword123", // mocked hash
      full_name: "Debug Test User",
    };

    console.log(`Attempting to insert user: ${testUser.email}`);

    const [result] = await connection.query(
      "INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)",
      [testUser.email, testUser.password, testUser.full_name],
    );

    console.log("✓ Insert successful. Insert ID:", result.insertId);

    // Verify retrieval
    const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [
      result.insertId,
    ]);
    if (rows.length > 0) {
      console.log("✓ Verified: User found in database:", rows[0].email);
    } else {
      console.error("✗ Failed to retrieve inserted user!");
    }

    // Cleanup
    await connection.query("DELETE FROM users WHERE id = ?", [result.insertId]);
    console.log("✓ Cleanup successful (test user deleted)");
  } catch (error) {
    console.error("✗ Error:", error.message);
    if (error.code) console.error("Error Code:", error.code);
  } finally {
    if (connection) await connection.end();
  }
};

runDebug();
