export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    plugins: ['~/server/plugins/prisma.ts'],
    preset: 'vercel',
    runtimeConfig: {
      vercel: {
        regions: ['iad1']
      }
    }
  },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    postgresUrl: process.env.POSTGRES_PRISMA_URL
  }
})
