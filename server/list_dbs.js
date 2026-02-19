import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const listDbs = async () => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
    });

    const [rows] = await connection.query("SHOW DATABASES");
    console.log("Databases:");
    rows.forEach((row) => console.log(`- ${row.Database}`));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) await connection.end();
  }
};

listDbs();
