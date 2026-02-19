import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const diagnose = async () => {
  console.log("--- MySQL Connection Diagnostic ---");
  const config = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306,
  };

  console.log(`Attempting to connect with:`);
  console.log(`Host: ${config.host}`);
  console.log(`Port: ${config.port}`);
  console.log(`User: ${config.user}`);

  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log("\n✅ Connection Successful!");

    const [dbs] = await connection.query("SHOW DATABASES");
    console.log("\nAvailable Databases:");
    dbs.forEach((row) => console.log(`- ${row.Database}`));

    // Check specifically for career_guide
    const hasCareerGuide = dbs.some((d) => d.Database === "career_guide");

    if (hasCareerGuide) {
      console.log("\n✅ 'career_guide' database FOUND.");
      await connection.changeUser({ database: "career_guide" });
      const [tables] = await connection.query("SHOW TABLES");
      console.log(`Tables in 'career_guide' (${tables.length} total):`);
      tables.forEach((row) => console.log(`- ${Object.values(row)[0]}`));
    } else {
      console.error("\n❌ 'career_guide' database NOT FOUND.");
    }
  } catch (error) {
    console.error("\n❌ Connection Failed:", error.message);
  } finally {
    if (connection) await connection.end();
  }
};

diagnose();
