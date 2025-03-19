import { PrismaClient } from '@prisma/client'
import { createHash } from 'crypto'

const prisma = new PrismaClient()
const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error('Missing Cloudinary configuration')
}

async function uploadToCloudinary(file: Buffer) {
  try {
    const base64Data = file.toString('base64')
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = createHash('sha256')
      .update(`timestamp=${timestamp}${apiSecret}`)
      .digest('hex')

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: `data:image/jpeg;base64,${base64Data}`,
        api_key: apiKey,
        timestamp: timestamp,
        signature: signature
      })
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error('Image upload error:', error)
    return null
  }
}

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw createError({
        statusCode: 400,
        message: 'No form data provided'
      })
    }

    const data: Record<string, string> = {}
    let imageBuffer: Buffer | null = null

    // Process form fields
    for (const field of formData) {
      if (field.name === 'image') {
        imageBuffer = field.data
        continue
      }
      if (field.name) {
        data[field.name] = field.data.toString('utf-8')
      }
    }

    // Validate required fields
    const requiredFields = ['title', 'type', 'date', 'time', 'venue', 'address', 'description', 'price'] as const
    for (const field of requiredFields) {
      if (!data[field]) {
        throw createError({
          statusCode: 400,
          message: `${field} is required`
        })
      }
    }

    // Handle image upload if present
    let imageUrl = null
    if (imageBuffer) {
      imageUrl = await uploadToCloudinary(imageBuffer)
      if (!imageUrl) {
        throw createError({
          statusCode: 500,
          message: 'Failed to upload image'
        })
      }
    }

    // Create event in database
    const newEvent = await prisma.event.create({
      data: {
        title: data.title,
        type: data.type,
        date: new Date(`${data.date}T${data.time}`),
        time: data.time,
        venue: data.venue,
        address: data.address,
        description: data.description,
        price: parseFloat(data.price),
        imageUrl
      }
    })

    return {
      success: true,
      data: newEvent
    }
  } catch (error: any) {
    console.error('Event creation error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create event'
    })
  }
})
