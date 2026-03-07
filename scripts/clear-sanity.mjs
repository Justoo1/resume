/**
 * Sanity Clear Script
 * Deletes ALL documents from the dataset (all types, all locales).
 *
 * Usage:
 *   SANITY_API_TOKEN=<write-token> node scripts/clear-sanity.mjs
 *
 * WARNING: This is irreversible. All content will be deleted.
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env.local
try {
  const env = readFileSync(resolve(__dirname, '../.env.local'), 'utf8')
  for (const line of env.split('\n')) {
    const [key, ...rest] = line.split('=')
    if (key && rest.length && !process.env[key.trim()]) {
      process.env[key.trim()] = rest.join('=').trim().replace(/^["']|["']$/g, '')
    }
  }
} catch {
  // .env.local not found, rely on environment variables
}

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const TOKEN      = process.env.SANITY_API_TOKEN

if (!PROJECT_ID) {
  console.error('ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
  process.exit(1)
}
if (!TOKEN) {
  console.error('ERROR: SANITY_API_TOKEN is not set')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

const TYPES = [
  'personalInfo',
  'workExperience',
  'project',
  'skill',
  'education',
  'certification',
  'caseStudy',
  'post',
]

async function clearAll() {
  console.log(`\nClearing dataset: ${PROJECT_ID}/${DATASET}\n`)

  for (const type of TYPES) {
    const ids = await client.fetch(`*[_type == $type]._id`, { type })
    if (ids.length === 0) {
      console.log(`  ${type}: nothing to delete`)
      continue
    }

    // Delete in batches of 50 using transactions
    let deleted = 0
    for (let i = 0; i < ids.length; i += 50) {
      const batch = ids.slice(i, i + 50)
      const tx = client.transaction()
      for (const id of batch) tx.delete(id)
      await tx.commit()
      deleted += batch.length
    }
    console.log(`  ✓ deleted ${deleted} × ${type}`)
  }

  console.log('\nDone. Dataset is empty.\n')
}

clearAll().catch((err) => {
  console.error('Clear failed:', err.message)
  process.exit(1)
})
