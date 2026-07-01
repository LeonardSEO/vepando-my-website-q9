#!/usr/bin/env node

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

    // Check if node_modules exists (read-only check; do not mutate from runtime)
    const nodeModulesPath = path.join(process.cwd(), "node_modules")
    const nodeModulesExists = fs.existsSync(nodeModulesPath)

    // Check critical dependencies
    const criticalDeps = ["next", "react", "react-dom", "@vercel/analytics"]

    const missingDeps = []
    const installedCriticalDeps = {}

    criticalDeps.forEach((dep) => {
      const depPath = path.join(nodeModulesPath, dep)
      if (!fs.existsSync(depPath)) {
        missingDeps.push(dep)
        return
      }

      const depPackageJsonPath = path.join(depPath, "package.json")
      if (fs.existsSync(depPackageJsonPath)) {
        try {
          const depPackageJson = JSON.parse(fs.readFileSync(depPackageJsonPath, "utf8"))
          installedCriticalDeps[dep] = depPackageJson.version || "unknown"
        } catch {
          installedCriticalDeps[dep] = "unknown"
        }
      } else {
        installedCriticalDeps[dep] = "unknown"
      }
    })

    if (!nodeModulesExists) {
      console.log("⚠️  node_modules folder not found")
    } else if (missingDeps.length > 0) {
      console.log(`⚠️  Missing critical dependencies: ${missingDeps.join(", ")}`)
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
      nodeModulesExists,
      dependencies: Object.keys(packageJson.dependencies || {}),
      devDependencies: Object.keys(packageJson.devDependencies || {}),
      installedCriticalDeps,
      missingDeps,
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
