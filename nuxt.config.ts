export default defineNuxtConfig({
  runtimeConfig: {
    version: '0.0.1'
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-svgo', '@huntersofbook/naive-ui-nuxt'],
  typescript: {
    shim: false
  },
  devServer: {
    port: 3002,
    host: 'localhost'
  },
  nitro: {
    plugins: ['~/server/plugins/prisma.ts']
  }
})
