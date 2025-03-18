import { PrismaClient } from '@prisma/client'
import { defineNitroPlugin } from 'nitropack/runtime/plugin'

const prisma = new PrismaClient()

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    event.context.prisma = prisma
  })
  
  // Cleanup on server shutdown
  nitroApp.hooks.hook('close', () => {
    prisma.$disconnect()
  })
}) 