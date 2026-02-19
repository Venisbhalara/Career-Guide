import { testConnection, pool } from "./config/db.js";

console.log("Verifying database connection...");

testConnection()
  .then(() => {
    console.log("VERIFICATION SUCCESS: Database connected successfully!");
    pool.end();
    process.exit(0);
  })
  .catch((err) => {
    console.error("VERIFICATION FAILED:", err);
    process.exit(1);
  });
