// Use require() instead of import for better compatibility with build systems
const fs = require("fs").promises
const fsSync = require("fs")
const path = require("path")
const https = require("https")
const http = require("http")

// External images to download and optimize
const EXTERNAL_IMAGES = [
  {
    url: "https://framerusercontent.com/images/bapnuSD6ZlqWswi5j86sm3XttI.png?lossless=1",
    filename: "leonard-van-hemert.png",
    description: "Leonard van Hemert profile photo",
  },
  // Add more external images here as needed
]

const IMAGES_DIR = path.join(process.cwd(), "public", "images")

/**
 * Download a file from URL to local path
 */
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https:") ? https : http

    const request = client.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fsSync.createWriteStream(filepath)
        response.pipe(fileStream)

        fileStream.on("finish", () => {
          fileStream.close()
          console.log(`✅ Downloaded: ${path.basename(filepath)}`)
          resolve()
        })

        fileStream.on("error", (err) => {
          console.error(`❌ File write error for ${filepath}:`, err.message)
          reject(err)
        })
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        const redirectUrl = response.headers.location
        console.log(`🔄 Redirecting ${url} -> ${redirectUrl}`)
        downloadFile(redirectUrl, filepath).then(resolve).catch(reject)
      } else {
        console.error(`❌ HTTP ${response.statusCode} for ${url}`)
        reject(new Error(`HTTP ${response.statusCode}`))
      }
    })

    request.on("error", (err) => {
      console.error(`❌ Request error for ${url}:`, err.message)
      reject(err)
    })

    request.setTimeout(30000, () => {
      request.destroy()
      reject(new Error("Request timeout"))
    })
  })
}

/**
 * Ensure directory exists
 */
async function ensureDir(dirPath) {
  try {
    await fs.access(dirPath)
  } catch {
    await fs.mkdir(dirPath, { recursive: true })
    console.log(`📁 Created directory: ${dirPath}`)
  }
}

/**
 * Check if file already exists and is recent
 */
async function shouldDownload(filepath) {
  try {
    const stats = await fs.stat(filepath)
    const ageInHours = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60)

    // Re-download if file is older than 24 hours (for CI cache invalidation)
    if (ageInHours > 24) {
      console.log(`🔄 File ${path.basename(filepath)} is ${Math.round(ageInHours)}h old, re-downloading...`)
      return true
    }

    console.log(`⏭️  Skipping ${path.basename(filepath)} (already exists and recent)`)
    return false
  } catch {
    // File doesn't exist, download it
    return true
  }
}

/**
 * Main function to download all external images
 */
async function fetchExternalImages() {
  console.log("🚀 Starting external image download...\n")

  try {
    // Ensure images directory exists
    await ensureDir(IMAGES_DIR)

    let downloadCount = 0
    let skipCount = 0

    // Process each external image
    for (const image of EXTERNAL_IMAGES) {
      const filepath = path.join(IMAGES_DIR, image.filename)

      console.log(`📥 Processing: ${image.description}`)
      console.log(`   URL: ${image.url}`)
      console.log(`   Local: /images/${image.filename}`)

      if (await shouldDownload(filepath)) {
        try {
          await downloadFile(image.url, filepath)
          downloadCount++
        } catch (error) {
          console.error(`❌ Failed to download ${image.filename}:`, error.message)
          // Don't exit on download failure in production builds
          console.log(`⚠️  Continuing build without ${image.filename}`)
        }
      } else {
        skipCount++
      }

      console.log("") // Empty line for readability
    }

    console.log(`✨ Image download complete!`)
    console.log(`   Downloaded: ${downloadCount} files`)
    console.log(`   Skipped: ${skipCount} files`)
    console.log(`   Total processed: ${EXTERNAL_IMAGES.length} files\n`)
  } catch (error) {
    console.error("❌ Error during image download:", error)
    // Don't fail the build for image download issues
    console.log("⚠️  Continuing build without external images")
  }
}

// Run the script
if (require.main === module) {
  fetchExternalImages()
}

module.exports = { fetchExternalImages, EXTERNAL_IMAGES }
