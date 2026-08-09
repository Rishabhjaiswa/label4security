const requiredEnv = ["DATABASE_URL", "DEFAULT_ADMIN_EMAIL", "DEFAULT_ADMIN_PASSWORD"];

// Avoid exiting the process during the Next.js static build phase.
const isBuildTime = process.env.NEXT_PHASE === "phase-production-build";

if (!isBuildTime) {
  for (const name of requiredEnv) {
    if (!process.env[name]) {
      console.error(`\n🚨 CRITICAL CONFIGURATION ERROR: Environment variable "${name}" is missing.`);
      console.error(`The application cannot start without this variable. Please configure it in your .env file.\n`);
      process.exit(1);
    }
  }
}
