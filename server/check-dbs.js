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

    // Check if connected
    const [rows] = await conn.query("SHOW DATABASES;");
    const dbs = rows.map((r) => r.Database);
    console.log(JSON.stringify({ port, status: "connected", databases: dbs }));

    if (dbs.includes("career_guide")) {
      await conn.changeUser({ database: "career_guide" });
      const [tables] = await conn.query("SHOW TABLES;");
      console.log(
        JSON.stringify({ port, status: "tables_check", tables: tables }),
      );
    }

    await conn.end();
  } catch (err) {
    console.log(JSON.stringify({ port, status: "failed", error: err.message }));
  }
};

(async () => {
  await check(3306);
  await check(3307);
  process.exit(0);
})();
