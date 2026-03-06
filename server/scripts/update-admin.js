import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";
import "dotenv/config";

const EMAIL = "vasu@gmail.com";
const PASSWORD = "123456";

async function updateAdmin() {
  try {
    const hashed = await bcrypt.hash(PASSWORD, 10);

    // Try to update existing admin
    const [result] = await pool.execute(
      "UPDATE users SET email = ?, password = ?, full_name = ? WHERE is_admin = 1 LIMIT 1",
      [EMAIL, hashed, "Vasu"],
    );

    if (result.affectedRows > 0) {
      console.log("✅ Admin credentials updated successfully!");
    } else {
      // No existing admin — create one
      await pool.execute(
        "INSERT INTO users (email, password, full_name, is_admin, profile_completed) VALUES (?, ?, ?, TRUE, TRUE)",
        [EMAIL, hashed, "Vasu"],
      );
      console.log("✅ New admin user created successfully!");
    }

    console.log(`   Email   : ${EMAIL}`);
    console.log(`   Password: ${PASSWORD}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await pool.end();
  }
}

updateAdmin();
