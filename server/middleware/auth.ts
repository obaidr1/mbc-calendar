import { defineEventHandler, parseCookies } from 'h3'

const ADMIN_PASSWORD = 'admin123' // In der Produktion sollte dies in einer .env-Datei gespeichert werden

export default defineEventHandler((event) => {
  const cookies = parseCookies(event)
  const isAdmin = cookies.adminAuth === ADMIN_PASSWORD

  if (event.path?.startsWith('/admin') && !isAdmin) {
    return sendRedirect(event, '/login')
  }
}) 