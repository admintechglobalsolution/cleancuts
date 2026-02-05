import fs from "fs"
import path from "path"

const root = process.cwd()

const pathsToCreate = [
  "prisma/schema.prisma",

  "src/app/page.tsx",
  "src/app/page.module.css",
  "src/app/layout.tsx",
  "src/app/loading.tsx",
  "src/app/error.tsx",

  "src/app/api/users/status/route.ts",

  "src/components/UserTable.tsx",

  "src/lib/prisma.ts",

  "src/types/user.ts",
]

function ensureDir(filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`📁 Created directory: ${dir}`)
  }
}

function createEmptyFileIfNotExists(filePath) {
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipped (exists): ${filePath}`)
    return
  }

  ensureDir(filePath)
  fs.writeFileSync(filePath, "")
  console.log(`✅ Created: ${filePath}`)
}

pathsToCreate.forEach((relativePath) => {
  createEmptyFileIfNotExists(path.join(root, relativePath))
})

console.log("\n✨ Folder structure generation completed")
