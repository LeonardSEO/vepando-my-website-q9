#!/usr/bin/env node

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

/**
 * Check if all dependencies are properly installed and up to date
 */
function checkDependencies() {
  console.log("🔍 Checking dependencies...")

  try {
    // Check if package.json exists
    const packageJsonPath = path.join(process.cwd(), "package.json")
    if (!fs.existsSync(packageJsonPath)) {
      console.error("❌ package.json not found")
      process.exit(1)
    }

    // Read package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

    // Check if node_modules exists
    const nodeModulesPath = path.join(process.cwd(), "node_modules")
    if (!fs.existsSync(nodeModulesPath)) {
      console.log("📦 Installing dependencies...")
      execSync("npm install", { stdio: "inherit" })
    }

    // Check critical dependencies
    const criticalDeps = ["next", "react", "react-dom", "@vercel/analytics"]

    const missingDeps = []

    criticalDeps.forEach((dep) => {
      const depPath = path.join(nodeModulesPath, dep)
      if (!fs.existsSync(depPath)) {
        missingDeps.push(dep)
      }
    })

    if (missingDeps.length > 0) {
      console.log(`⚠️  Missing dependencies: ${missingDeps.join(", ")}`)
      console.log("📦 Installing missing dependencies...")
      execSync("npm install", { stdio: "inherit" })
    }

    // Check for security vulnerabilities
    try {
      console.log("🔒 Checking for security vulnerabilities...")
      execSync("npm audit --audit-level=high", { stdio: "pipe" })
      console.log("✅ No high-severity vulnerabilities found")
    } catch (error) {
      console.log('⚠️  Security vulnerabilities detected. Run "npm audit fix" to resolve.')
    }

    // Check TypeScript configuration
    const tsConfigPath = path.join(process.cwd(), "tsconfig.json")
    if (fs.existsSync(tsConfigPath)) {
      console.log("📝 TypeScript configuration found")
    }

    // Check Next.js configuration
    const nextConfigPath = path.join(process.cwd(), "next.config.mjs")
    if (fs.existsSync(nextConfigPath)) {
      console.log("⚙️  Next.js configuration found")
    }

    console.log("✅ All dependencies are properly installed")

    return {
      success: true,
      dependencies: Object.keys(packageJson.dependencies || {}),
      devDependencies: Object.keys(packageJson.devDependencies || {}),
      missingDeps: [],
    }
  } catch (error) {
    console.error("❌ Error checking dependencies:", error.message)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Run if called directly
if (require.main === module) {
  const result = checkDependencies()
  process.exit(result.success ? 0 : 1)
}

module.exports = { checkDependencies }
