import { PrismaClient } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'

const prisma = new PrismaClient()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

interface FormData {
  title: string
  type: string
  date: string
  time: string
  venue: string
  address: string
  description: string
  price: string
  isRepeating: string
  repeatUntil: string
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

    // Parse form data
    const data: FormData = {} as FormData
    let imageFile: any = null

    for (const part of formData) {
      if (part.type === 'file') {
        imageFile = part
      } else if (part.name) {
        data[part.name as keyof FormData] = part.data.toString()
      }
    }

    // Upload image to Cloudinary if provided
    let imageUrl = null
    if (imageFile) {
      const uploadResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'events',
            resource_type: 'auto'
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )

        uploadStream.end(imageFile.data)
      })

      imageUrl = (uploadResponse as any).secure_url
    }

    // Create the main event
    const mainEvent = await prisma.event.create({
      data: {
        title: data.title,
        type: data.type,
        date: new Date(data.date),
        time: data.time,
        venue: data.venue,
        address: data.address,
        description: data.description,
        price: parseFloat(data.price),
        imageUrl,
        isRepeating: data.isRepeating === 'true',
        repeatUntil: data.isRepeating === 'true' ? new Date(data.repeatUntil) : null
      }
    })

    // If event is repeating, create additional events
    if (data.isRepeating === 'true') {
      const startDate = new Date(data.date)
      const endDate = new Date(data.repeatUntil)
      const events = []

      // Create events for each week until repeatUntil date
      for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 7)) {
        if (date.getTime() === startDate.getTime()) continue // Skip the first date as it's already created

        events.push({
          title: data.title,
          type: data.type,
          date: new Date(date),
          time: data.time,
          venue: data.venue,
          address: data.address,
          description: data.description,
          price: parseFloat(data.price),
          imageUrl,
          isRepeating: true,
          repeatUntil: new Date(data.repeatUntil),
          parentId: mainEvent.id
        })
      }

      // Create all repeated events
      await prisma.event.createMany({
        data: events
      })
    }

    return mainEvent
  } catch (error: any) {
    console.error('Error creating event:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to create event'
    })
  }
})
