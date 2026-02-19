import mysql from "mysql2/promise";

const check = async (port) => {
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1664",
      port: port,
    });
    console.log(`Port ${port}: SUCCESS`);
    await conn.end();
  } catch (err) {
    console.log(`Port ${port}: FAILED (${err.message})`);
  }
};

(async () => {
  await check(3306);
  await check(3307);
})();
