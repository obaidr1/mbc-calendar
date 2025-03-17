export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    plugins: ['~/server/plugins/prisma.ts']
  },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    databaseUrl: process.env.DATABASE_URL
  }
})
