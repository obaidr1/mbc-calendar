import { defineEventHandler, readBody, setCookie } from 'h3'

const ADMIN_PASSWORD = 'admin123' // In der Produktion sollte dies in einer .env-Datei gespeichert werden

export default defineEventHandler(async (event) => {
  try {
    const { password } = await readBody(event)

    if (password === ADMIN_PASSWORD) {
      // Setze einen sicheren Cookie
      setCookie(event, 'adminAuth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 24 Stunden
      })

      return {
        success: true,
        message: 'Login erfolgreich'
      }
    }

    return {
      success: false,
      message: 'Falsches Passwort'
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      message: 'Ein Fehler ist aufgetreten'
    }
  }
}) 