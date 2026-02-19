import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const fingerprint = async () => {
  let connection;
  try {
    console.log("Connecting to DB from Node.js...");
    // Explicitly using the values from .env that we think are correct
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
    });

    console.log("Connected! Fetching server details...");

    const [results] = await connection.query(`
            SELECT 
                @@hostname as hostname, 
                @@port as port, 
                @@version as version, 
                @@datadir as datadir,
                @@socket as socket;
        `);

    console.log("\n--- SERVER FINGERPRINT (from Node.js) ---");
    console.log(results[0]);
    console.log("-----------------------------------------");
  } catch (error) {
    console.error("Connection failed:", error.message);
  } finally {
    if (connection) await connection.end();
  }
};

fingerprint();
