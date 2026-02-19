import mysql from "mysql2/promise";

const configs = [
  { host: "localhost", user: "root", password: "", port: 3306 },
  { host: "localhost", user: "root", password: "password", port: 3306 },
  { host: "localhost", user: "root", password: "root", port: 3306 },
  { host: "localhost", user: "root", password: "1234", port: 3306 },
  { host: "localhost", user: "root", password: "1664", port: 3306 },
  { host: "localhost", user: "root", password: "", port: 3307 },
  { host: "localhost", user: "root", password: "password", port: 3307 },
  { host: "localhost", user: "root", password: "root", port: 3307 },
  { host: "localhost", user: "root", password: "1234", port: 3307 },
  { host: "localhost", user: "root", password: "1664", port: 3307 },
];

async function testConnections() {
  console.log("Testing database connections...");
  for (const config of configs) {
    try {
      console.log(
        `Trying: Host=${config.host}, Port=${config.port}, User=${config.user}, Password='${config.password}'`,
      );
      const connection = await mysql.createConnection(config);
      console.log("✅ SUCCESS! Connected with:");
      console.log(JSON.stringify(config, null, 2));
      await connection.end();
      return;
    } catch (error) {
      console.log(`❌ Failed: ${error.message}`);
    }
  }
  console.log("❌ All attempts failed.");
}

testConnections();
