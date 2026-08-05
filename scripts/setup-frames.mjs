/**
 * setup-frames.mjs
 * 
 * Extracts animation ZIP files and organizes frames into public/frames/ directory.
 * Run: node scripts/setup-frames.mjs
 */

import { createReadStream, mkdirSync, existsSync, readdirSync, copyFileSync } from 'fs'
import { resolve, join, extname, basename } from 'path'
import { Extract } from 'unzipper'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const ROOT = resolve(__dirname, '..')
const ZIPS_DIR = resolve(ROOT, '..') // ZIPs are in parent directory (e:\matrix tags\)
const PUBLIC_FRAMES = resolve(ROOT, 'public', 'frames')

const zipMappings = [
  { file: 'hologram_stick.zip', folder: 'hologram' },
  { file: 'shrink.zip', folder: 'shrink' },
  { file: 'dome_sticker.zip', folder: 'dome' },
]

async function extractZip(zipPath, outputDir) {
  return new Promise((resolve, reject) => {
    if (!existsSync(zipPath)) {
      console.warn(`⚠️  ZIP not found: ${zipPath}`)
      resolve(false)
      return
    }
    mkdirSync(outputDir, { recursive: true })
    createReadStream(zipPath)
      .pipe(Extract({ path: outputDir }))
      .on('close', () => {
        console.log(`✅ Extracted: ${basename(zipPath)} → ${outputDir}`)
        resolve(true)
      })
      .on('error', reject)
  })
}

async function renameToSequential(dir) {
  if (!existsSync(dir)) return
  const files = readdirSync(dir)
    .filter(f => ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase()))
    .sort()

  files.forEach((file, i) => {
    const oldPath = join(dir, file)
    const ext = extname(file).toLowerCase().replace('.jpeg', '.jpg')
    const newName = String(i + 1).padStart(4, '0') + ext
    const newPath = join(dir, newName)
    if (oldPath !== newPath) {
      copyFileSync(oldPath, newPath)
    }
  })
  console.log(`📁 Renamed ${files.length} frames in ${dir}`)
}

async function main() {
  console.log('🎬 Setting up animation frames...\n')
  mkdirSync(PUBLIC_FRAMES, { recursive: true })

  for (const { file, folder } of zipMappings) {
    const zipPath = resolve(ZIPS_DIR, file)
    const outputDir = resolve(PUBLIC_FRAMES, folder)
    
    console.log(`📦 Processing ${file}...`)
    const extracted = await extractZip(zipPath, outputDir)
    
    if (extracted) {
      await renameToSequential(outputDir)
    } else {
      // Create placeholder frames for development
      console.log(`📝 Creating placeholder frames for ${folder}...`)
      mkdirSync(outputDir, { recursive: true })
    }
  }
  
  console.log('\n🎉 Frame setup complete!')
  console.log('📂 Frames located at: public/frames/')
  console.log('\nFolders:')
  zipMappings.forEach(({ folder }) => {
    console.log(`  - public/frames/${folder}/0001.jpg ... (sequential frames)`)
  })
}

main().catch(console.error)
