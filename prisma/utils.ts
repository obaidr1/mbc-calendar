import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

export function setAbsoluteSqliteDatabaseUrlForPrisma() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const dbPath = join(__dirname, 'dev.db')
  
  process.env.DATABASE_URL = `file:${dbPath}`
} 