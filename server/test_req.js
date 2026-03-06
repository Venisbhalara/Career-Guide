import fs from "fs";
import path from "path";

const dirs = ["controllers", "routes", "utils", "database"];

async function check() {
  for (const dir of dirs) {
    const files = fs.readdirSync(path.join(process.cwd(), dir));
    for (const file of files) {
      if (file.endsWith(".js")) {
        try {
          await import(`./${dir}/${file}`);
          console.log(`OK: ${file}`);
        } catch (e) {
          console.error(`ERROR in ${file}:`, e.message);
        }
      }
    }
  }
  process.exit(0);
}

check();
