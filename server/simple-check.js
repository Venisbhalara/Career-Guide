import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const check = async (port) => {
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1664",
      port: port,
    });

    const [rows] = await conn.query("SHOW DATABASES LIKE 'career_guide';");
    if (rows.length > 0) {
      console.log("DB_EXISTS: YES");
      await conn.changeUser({ database: "career_guide" });
      const [tables] = await conn.query("SHOW TABLES;");
      console.log(`TABLE_COUNT: ${tables.length}`);
    } else {
      console.log("DB_EXISTS: NO");
    }

    await conn.end();
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }
};

check(3306);
