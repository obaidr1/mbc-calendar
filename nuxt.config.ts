export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: [],
  nitro: {
    preset: 'vercel'
  },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    postgresUrl: process.env.POSTGRES_PRISMA_URL
  }
})
