import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log("Checking database content:", process.env.DB_NAME);

const checkDb = async () => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "career_guide",
    });

    console.log("\n--- USERS ---");
    const [users] = await connection.query(
      "SELECT id, email, full_name, created_at FROM users ORDER BY created_at DESC",
    );
    console.log(`Total Users: ${users.length}`);
    console.table(users);

    console.log("\n--- ASSESSMENT ANSWERS ---");
    const [assessments] = await connection.query(
      "SELECT id, user_id, question_id, score, created_at FROM assessment_answers ORDER BY created_at DESC",
    );
    console.log(`Total Assessment Answers: ${assessments.length}`);
    if (assessments.length > 0) {
      console.table(assessments);
    } else {
      console.log("No assessment answers found.");
    }

    console.log("\n--- COUNSELLING SESSIONS ---");
    const [sessions] = await connection.query(
      "SELECT id, user_id, counsellor_name, session_date, status FROM counselling_sessions ORDER BY created_at DESC",
    );
    console.log(`Total Counselling Sessions: ${sessions.length}`);
    if (sessions.length > 0) {
      console.table(sessions);
    } else {
      console.log("No counselling sessions found.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    if (connection) await connection.end();
  }
};

checkDb();
