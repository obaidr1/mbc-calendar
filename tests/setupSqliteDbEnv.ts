import { setAbsoluteSqliteDatabaseUrlForPrisma } from '../prisma/utils'
import { defineNuxtConfig } from 'nuxt/config'

/**
 * Setup the database environment and Nuxt configuration.
 *
 * This is necessary for the vanilla `sqlite` setup, as it depends on a file that is in an absolute place.
 *
 * As soon as the user adds a `.env` file overwriting `DATABASE_URL` or export `DATABSE_URL` themselves we do not want to set the database url manually any longer.
 *
 */
export const setup = async () => {
  // Set up database URL
  setAbsoluteSqliteDatabaseUrlForPrisma()
  
  // Define Nuxt config for tests
  defineNuxtConfig({
    devtools: { enabled: false },
    modules: ['@nuxtjs/tailwindcss'],
    nitro: {
      plugins: ['~/server/plugins/prisma.ts']
    }
  })
}
