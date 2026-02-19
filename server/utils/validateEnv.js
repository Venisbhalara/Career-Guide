// Validate required environment variables
const requiredEnvVars = [
  "DB_HOST",
  "DB_USER",
  "DB_NAME",
  "JWT_SECRET",
  "CLIENT_URL",
];

export const validateEnv = () => {
  const missing = [];

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:");
    missing.forEach((varName) => {
      console.error(`   - ${varName}`);
    });
    console.error(
      "\nPlease check your .env file and ensure all required variables are set.",
    );
    return false;
  }

  // Warn about weak JWT secret
  if (
    process.env.JWT_SECRET &&
    process.env.JWT_SECRET.includes("change_in_production")
  ) {
    console.warn(
      "⚠️  WARNING: You are using a default JWT_SECRET. Please change it in production!",
    );
  }

  console.log("✓ All required environment variables are set");
  return true;
};
